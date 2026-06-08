{
  description = "Englisch Projekt monorepo services";

  inputs.nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";

  outputs = { self, nixpkgs }:
    let
      systems = [
        "x86_64-linux"
        "aarch64-linux"
      ];

      forAllSystems = nixpkgs.lib.genAttrs systems;
    in
    {
      packages = forAllSystems (system:
        let
          pkgs = nixpkgs.legacyPackages.${system};
        in
        {
          default = pkgs.stdenvNoCC.mkDerivation {
            pname = "englisch-projekt-source";
            version = "0.0.0";
            src = self;

            installPhase = ''
              runHook preInstall
              mkdir -p $out
              cp -R . $out/
              runHook postInstall
            '';
          };
        });

      nixosModules.default = { config, lib, pkgs, ... }:
        let
          cfg = config.services.englisch-projekt;
          bun = lib.getExe pkgs.bun;
          source = self.packages.${pkgs.system}.default;
          stateRoot = "/var/lib/englisch-projekt";
          appRoot = "${stateRoot}/source";
        in
        {
          options.services.englisch-projekt = {
            enable = lib.mkEnableOption "Englisch Projekt web and API services";

            web = {
              host = lib.mkOption {
                type = lib.types.str;
                default = "0.0.0.0";
                description = "Host address for the Vite web service.";
              };

              port = lib.mkOption {
                type = lib.types.port;
                default = 5173;
                description = "Port for the Vite web service.";
              };
            };

            api = {
              port = lib.mkOption {
                type = lib.types.port;
                default = 3000;
                description = "Port for the Bun API service.";
              };

              environmentFile = lib.mkOption {
                type = lib.types.nullOr lib.types.str;
                default = null;
                description = "Path to an environment file containing OPENAI environment variables for the API service.";
              };
            };
          };

          config = lib.mkIf cfg.enable {
            systemd.services.englisch-projekt-setup = {
              description = "Prepare Englisch Projekt workspace";
              wantedBy = [ "multi-user.target" ];
              before = [
                "englisch-projekt-web.service"
                "englisch-projekt-api.service"
              ];

              path = [
                pkgs.bun
                pkgs.coreutils
              ];

              serviceConfig = {
                Type = "oneshot";
                RemainAfterExit = true;
              };

              script = ''
                rm -rf ${appRoot}
                mkdir -p ${stateRoot}
                cp -R ${source} ${appRoot}
                chmod -R u+w ${appRoot}
                cd ${appRoot}
                ${bun} install --frozen-lockfile
              '';
            };

            systemd.services.englisch-projekt-web = {
              description = "Englisch Projekt web service";
              wantedBy = [ "multi-user.target" ];
              after = [
                "network.target"
                "englisch-projekt-setup.service"
              ];
              requires = [ "englisch-projekt-setup.service" ];

              environment = {
                NODE_ENV = "development";
              };

              serviceConfig = {
                WorkingDirectory = appRoot;
                ExecStart = "${bun} --filter @englisch/web dev --host ${cfg.web.host} --port ${toString cfg.web.port}";
                Restart = "on-failure";
              };
            };

            systemd.services.englisch-projekt-api = {
              description = "Englisch Projekt API service";
              wantedBy = [ "multi-user.target" ];
              after = [
                "network.target"
                "englisch-projekt-setup.service"
              ];
              requires = [ "englisch-projekt-setup.service" ];

              environment = {
                NODE_ENV = "production";
                PORT = toString cfg.api.port;
              };

              serviceConfig = {
                WorkingDirectory = appRoot;
                ExecStart = "${bun} --filter @englisch/api start";
                Restart = "on-failure";
              } // lib.optionalAttrs (cfg.api.environmentFile != null) {
                EnvironmentFile = cfg.api.environmentFile;
              };
            };
          };
        };
    };
}
