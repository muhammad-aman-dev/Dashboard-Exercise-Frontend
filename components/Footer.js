import { motion } from "framer-motion";
const Footer = () => {
  return (
<motion.footer
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
  viewport={{ once: true }}
  className="w-[90%] ml-[5%] sm:ml-[10%] sm:w-[80%] mt-10 mb-6 bg-gray-800/30 rounded-2xl p-6 border border-[#10b981]/20 backdrop-blur-sm flex flex-col items-center justify-center text-center"
>
  <div className="w-full flex flex-col sm:flex-row justify-between items-center gap-4 border-b border-[#10b981]/30 pb-4">
    <motion.h3
      className="text-lg sm:text-xl font-semibold bg-linear-to-r from-[#10b981] to-[#34d399] bg-clip-text text-transparent"
    >
      Store Analytics Dashboard
    </motion.h3>

    <div className="flex gap-4 text-gray-400 text-sm">
      <a
        href="#"
        className="hover:text-[#10b981] transition-colors duration-200"
      >
        Privacy Policy
      </a>
      <a
        href="#"
        className="hover:text-[#10b981] transition-colors duration-200"
      >
        Terms
      </a>
      <a
        href="#"
        className="hover:text-[#10b981] transition-colors duration-200"
      >
        Support
      </a>
    </div>
  </div>

  <div className="mt-4 flex flex-col sm:flex-row items-center justify-between w-full text-gray-500 text-xs sm:text-sm">
    <p>© {new Date().getFullYear()} StorePulse Analytics. All rights reserved.</p>
    <p className="text-gray-400 mt-2 sm:mt-0">
      Built with <span className="text-[#10b981]">Next.js</span> • Animated with{" "}
      <span className="text-[#34d399]">Framer Motion</span>
    </p>
  </div>
</motion.footer>

  )
}

export default Footer
