import { motion } from "framer-motion";
import "./Homeannimations.css";

// export const  Myannimation =() =>{
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 50 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       viewport={{ once: true }} 
//       transition={{ duration: 0.5 }}
//     >
     
//     </motion.div>
//   );
// }
 export const Myannimation = ({ children, direction = 'up' }) => {
  const variants = {
    hidden: {
      opacity: 0,
      x: direction === 'right' ? -100 : direction === 'left' ? 100 : 0, 
      y: direction === 'up' ? 100 : direction === 'down' ? -100 : 0,    
    },
    
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 1.2,
        ease: 'easeOut',
      },
    },
  };

  return (
    <motion.section
      variants={variants}
      initial="hidden"       
      whileInView="visible"  
      viewport={{ once: false, amount: 0.2 }} 
    >
      {children}
    </motion.section>
  );
};