import { motion } from "framer-motion";
import "./Homeannimations.css";

// export const  Myannimation =() =>{
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 50 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       viewport={{ once: true }} // एनिमेशन सिर्फ एक बार चलेगा
//       transition={{ duration: 0.5 }}
//     >
     
//     </motion.div>
//   );
// }
 export const Myannimation = ({ children, direction = 'up' }) => {
  // हम एनिमेशन के लिए 'variants' का उपयोग करेंगे, यह कोड को साफ रखता है
  const variants = {
    // शुरुआती स्थिति (जब एलिमेंट स्क्रीन पर नहीं है)
    hidden: {
      opacity: 0,
      x: direction === 'right' ? -100 : direction === 'left' ? 100 : 0, // दिशा के आधार पर X की स्थिति
      y: direction === 'up' ? 100 : direction === 'down' ? -100 : 0,    // दिशा के आधार पर Y की स्थिति
    },
    // अंतिम स्थिति (जब एलिमेंट स्क्रीन पर आ जाता है)
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
      initial="hidden"       // शुरुआत में 'hidden' variant लागू होगा
      whileInView="visible"  // जब व्यू में आएगा तो 'visible' variant लागू होगा
      viewport={{ once: false, amount: 0.2 }} // एनिमेशन एक बार चलेगा और जब 20% हिस्सा दिखेगा तब चलेगा
    >
      {children}
    </motion.section>
  );
};