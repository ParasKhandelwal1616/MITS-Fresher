import { motion } from 'framer-motion'

const Loading = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-slate-900">
      <div className="flex flex-col items-center">
        <motion.div
          animate={{
            scale: [1, 2, 2, 1, 1],
            rotate: [0, 0, 180, 180, 0],
            borderRadius: ["0%", "0%", "50%", "50%", "0%"]
          }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            times: [0, 0.2, 0.5, 0.8, 1],
            repeat: Infinity,
            repeatDelay: 1
          }}
          className="w-16 h-16 bg-gradient-to-r from-purple-500 to-cyan-500"
        />
        <h2 className="mt-5 text-2xl font-bold text-white">Loading MITS Freaser</h2>
        <p className="text-gray-400">Preparing your 3D experience...</p>
      </div>
    </div>
  );
};

export default Loading;