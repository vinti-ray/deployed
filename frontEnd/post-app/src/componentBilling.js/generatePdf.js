// import jsPDF from 'jspdf';
// import "./pdf.css"
// import html2pdf from 'html2pdf.js';

// import React, { useState } from 'react';
// import html2pdf from 'html2pdf.js';

// function InvoiceGenerator() {
//   const [invoiceData, setInvoiceData] = useState({
//     // Your invoice data here
//   });

//   const generatePDF = () => {
//     const element = document.getElementById('invoice-content');

//     html2pdf().set({
//       margin: 1,
//       filename: 'invoice.pdf',
//       image: { type: 'jpeg', quality: 0.98 },
//       html2canvas: { dpi: 192, letterRendering: true },
//       jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
//       useCORS: true,
//       includeHiddenHtml: true,
//       // Add any other options here
//     }).from(element).outputPdf().then((pdf) => {
//       const formData = new FormData();
//       formData.append('invoice', pdf);
      
//       fetch('/api/invoice', {
//         method: 'POST',
//         body: formData
//       }).then(response => {
//         // Handle the response from the server here
//       });
//     });
//   };

//   return (
//     <div>
//       {/* Your invoice content here */}
//       <div id="invoice-content">
//         {/* Render your invoice data here */}
//       </div>
//       <button onClick={generatePDF}>Generate Invoice</button>
//     </div>
//   );
// }

  
//   export default generatePDF
  