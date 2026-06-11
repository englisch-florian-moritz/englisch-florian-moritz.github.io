import LibertyN from "../../public/LibertyN.png";
import DepartmentR from "../../public/DepartmentR.png";
import Elems from "../../public/elems.png";

export default function Section() {
  return (
    <div className="flex flex-col gap-16 p-12 mt-16 mx-auto max-w-[95vw] font-text">

      {/* ========== 1. THE PROMISE ========== */}
      <div className="flex flex-row items-start gap-16 mt-20 -mb-10">
        <div className="w-3/5">
          <div
            style={{ transition: "transform 0.3s ease" }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "translateX(1.0rem)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "translateX(0)")}
          >
            <h3 className="text-6xl text-white mb-6 font-bold tracking-wide">
              1. The Promise
            </h3>
          </div>
          
          <p className="text-2xl text-white mb-3 leading-relaxed">
            "America is the land of hope"; <span className="font-bold hover:text-red-300 transition-colors duration-300">That is what Jende thinks when he comes from Cameroon.</span>
          </p>
          <p className="text-2xl text-white mb-3 leading-relaxed italic">
            He wants to become somebody;
          </p>
          <p className="text-2xl text-white mb-4 leading-relaxed italic">
            "America has something for everyone, sir" (Jende to Clark, p.40)
          </p>
          <p className="text-2xl text-white mb-3 leading-relaxed">
           <span className="font-bold hover:text-red-300 transition-colors duration-300">Back in Cameroon, everyone wants Jende to be successful;</span> They all want him to become successful
          </p>
          <p className="text-2xl text-white mb-3 leading-relaxed italic">
            "with pockets full of dollars and photos of a happy life" (p.19)
          </p>
          <p className="text-2xl text-white leading-relaxed italic">
            "my son will grow up to be somebody, whatever he wants to be" (p.46)
          </p>
                 <p
          className="text-white text-2xl font-extrabold leading-relaxed duration-200 mt-10"
          style={{ transition: "font-size 0.2s ease" }}
          onMouseEnter={(e) => (e.currentTarget.style.fontSize = "1.875rem")}
          onMouseLeave={(e) => (e.currentTarget.style.fontSize = "1.5rem")}
          data-reveal
          data-delay="10"
        >
          Many immigrants share the same hope:
        </p>
        <p
          className="text-white text-2xl font-boldleading-relaxed duration-200"
          style={{ transition: "font-size 0.2s ease" }}
          onMouseEnter={(e) => (e.currentTarget.style.fontSize = "1.875rem")}
          onMouseLeave={(e) => (e.currentTarget.style.fontSize = "1.5rem")}
          data-reveal
          data-delay="10"
        >
          to have a life that is finally meaningful.
        </p>
        </div>
        <div className="w-2/5 flex justify-center pt-8">
          <img
            src={LibertyN}
            className="w-full max-w-md scale-130 hover:scale-105 hover:rotate-3 transition-all duration-300"
            alt="Statue of Liberty"
          />
        </div>
      </div>

      {/* ========== 2. THE MACHINE ========== */}
      <div className="flex flex-row-reverse items-start gap-16">
        <div className="w-3/5">
          <div
            style={{ transition: "transform 0.3s ease" }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "translateX(1.0rem)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "translateX(0)")}
          >
            <h3 className="text-6xl text-white mb-6 font-bold tracking-wide">
              2. The Machine
            </h3>
          </div>
          
          <p className="text-2xl text-white mb-5 leading-relaxed">
            The book shows the reality; <span className="font-bold hover:text-red-300 transition-colors duration-300">Immigration is </span> a <span className="font-bold text-red-300">jagged machine</span>. The road to citizenship is unclear and expensive.
          </p>

          <div className="bg-black/60 backdrop-blur-md p-6 rounded-lg border-l-4 border-red-400 mb-4">
            <p className="text-white text-xl italic mb-2">
              "I have EAD. EAD, sir ... that is what I have right now. It means Employment Authorization Document... It means I am allowed to work, sir. Until I get my green card."
            </p>
            <p className="text-red-300 text-lg font-bold">— Jende, p.6</p>
            <p className="text-white/80 text-lg mt-2">
              Jende's legal status is temporary. He is "allowed" to work.
            </p>
          </div>

          <div className="bg-black/60 backdrop-blur-md p-6 rounded-lg border-l-4 border-red-400 mb-4">
            <p className="text-white text-xl italic mb-2">
              "Immigration is slow, sir; very funny how they work"
            </p>
            <p className="text-red-300 text-lg font-bold">— Jende, p.7</p>
            <p className="text-white/80 text-lg mt-2">
              The system is slow and unfair. Immigrants are at the mercy of bureaucracy.
            </p>
          </div>

          <div className="bg-black/60 backdrop-blur-md p-6 rounded-lg border-l-4 border-red-400">
            <p className="text-white text-xl italic mb-2">
              "Asylum is the best way to get papier and remain in the country... We all do what we gotta do to become American, abi?"
            </p>
            <p className="text-red-300 text-lg font-bold">— Bubakar, p.19</p>
            <p className="text-white/80 text-lg mt-2">
              How can a system be fair if you have to fight it with lies?
            </p>
          </div>
        </div>
        <div className="w-2/5 flex justify-center pt-8">
          <img
            src={DepartmentR}
            className="w-full max-w-md scale-150 hover:scale-115 hover:-rotate-3 transition-all duration-300 opacity-80"
            alt="Department"
          />
        </div>
      </div>

      {/* ========== 3. THE SHIFT ========== */}
      <div className="flex flex-row items-start gap-16">
        <div className="w-3/5">
          <div
            style={{ transition: "transform 0.3s ease" }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "translateX(1.0rem)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "translateX(0)")}
          >
            <h3 className="text-6xl text-white mb-6 font-bold tracking-wide">
              3. The Shift
            </h3>
          </div>
          
          <p className="text-2xl text-white mb-5 leading-relaxed font-bold">
            So how does this change the normal idea of America?
          </p>
          
          <p className="text-2xl text-white mb-5 leading-relaxed">
            Normally, America is the <span className="italic">"Land of the Free"</span>. America stands for open doors and new chances. <span className="font-bold hover:text-red-300 transition-colors duration-300">But the immigration;</span> It is not a welcoming; It is a machine that processes people.
          </p>
          
          <p className="text-2xl text-white mb-6 leading-relaxed">
            The road to citizenship is unclear; "The Dream" is not denied. <span className="font-bold">It is delayed and full of bureaucracy .</span>
          </p>

          <div className="grid grid-cols-2 gap-6 mb-6">
            <div className="bg-black/50 backdrop-blur-md p-6 rounded-lg border border-white/30">
              <h4 className="text-white font-bold text-2xl mb-4">The Idea</h4>
              <ul className="text-white/90 text-xl space-y-3">
                <li>America = Opportunity for all</li>
                <li>Immigration = New beginning</li>
                <li>Hard work = Success</li>
                <li>The Dream is accessible</li>
                <li></li>
              </ul>
            </div>

            <div className="bg-black/50 backdrop-blur-md p-6 rounded-lg border border-red-500/50">
              <h4 className="text-red-300 font-bold text-2xl mb-4">The Book's Idea</h4>
              <ul className="text-white/90 text-xl space-y-3">
                <li>America = Conditional access</li>
                <li>Immigration = Bureaucratic struggle</li>
                <li>Hard work is not enough (EAD expires!)</li>
                <li>The Dream is a false promise</li>
                <li></li>
              </ul>
            </div>
          </div>

          <div className="bg-black/50 backdrop-blur-md p-6 rounded-lg border border-white/20">
            <h4 className="text-white font-bold text-2xl mb-4">The "Jagged" Road</h4>
            <p className="text-white text-xl mb-4 leading-relaxed">
              The system is not just slow; <span className="font-bold hover:text-red-300 transition-colors duration-300">It is designed to be difficult.</span>
            </p>
            <p className="text-white text-xl mb-4 leading-relaxed font-bold">
            </p>
            <p className="text-white text-xl leading-relaxed">
              Therefore, this shifts the image of America. It moves from a symbol of hope to a place of selective opportunity. That is not fair; It is about race and power. The system decides who gets in. Not because of who you are, but because of where you come from.
            </p>
          </div>
        </div>
        <div className="w-2/5 flex justify-center pt-8">
          <img
            src={Elems}
            className="w-full max-w-md scale-150 mt-100 hover:scale-125 hover:rotate-3 transition-all duration-300 opacity-100"
            alt="Elements"
          />
        </div>
      </div>

    </div>
  );
}