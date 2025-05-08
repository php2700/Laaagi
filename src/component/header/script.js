import { Scripts } from "react-router-dom";

document.addEventListener('DOMContentLoaded', function() {
    // Sabhi navigation items ko select karein
    const navItems = document.querySelectorAll('.main-nav .nav-item');
  
    // Content area ko select karein (optional)
    const contentArea = document.getElementById('content-area');
  
    // Har item par click event listener add karein
    navItems.forEach(item => {
      item.addEventListener('click', function(event) {
        // Default link behavior (page reload/jump) ko rokein
        event.preventDefault();
  
        // Pehle sabhi items se 'active' class hata dein
        navItems.forEach(innerItem => {
          innerItem.classList.remove('active');
        });
  
        // Fir, jis item par click hua hai, uspe 'active' class add karein
        this.classList.add('active');
  
        // Optional: Update content based on clicked item
        if (contentArea) {
          contentArea.textContent = `Content for ${this.textContent} will show here.`;
        }
  
        console.log(this.textContent + " clicked"); // Console mein check karne ke liye
      });
    });
  });
  export default Scripts.js;