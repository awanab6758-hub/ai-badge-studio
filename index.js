function generateCard() {
    const nameInput = document.getElementById('input-name').value.trim();
    const roleInput = document.getElementById('input-role').value.trim();
    const emailInput = document.getElementById('input-email').value.trim();
    const phoneInput = document.getElementById('input-phone').value.trim();
    const imgInput = document.getElementById('input-img').files[0];

    // Form inputs validation
    if (!nameInput || !roleInput || !emailInput || !phoneInput) {
        alert("Kindly fill out all details to generate badge!");
        return;
    }

    // Card text nodes update kar rha ha
    document.getElementById('card-name').innerText = nameInput;
    document.getElementById('card-role').innerText = roleInput;
    document.getElementById('card-email').innerText = "📧 " + emailInput;
    document.getElementById('card-phone').innerText = "📞 " + phoneInput;

    // Image stream handler
    if (imgInput) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('card-img').src = e.target.result;
        }
        reader.readAsDataURL(imgInput);
    } else {
        // Fallback vector template background par set ho jayega agar user image na daale
        document.getElementById('card-img').src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%2364748b'><path d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'/></svg>";
    }

    // Components visibility transition triggers
    document.getElementById('generated-card').classList.remove('hidden');
    document.getElementById('action-buttons').classList.remove('hidden');
}

function downloadCard(format) {
    const card = document.getElementById('generated-card');
    const userName = document.getElementById('card-name').innerText;
    
    // Canvas capturing system with structural configuration
    html2canvas(card, {
        useCORS: true,
        scale: 3, 
        backgroundColor: null 
    }).then(canvas => {
        const imgData = canvas.toDataURL("image/png");

        if (format === 'png') {
            // PNG Engine pipeline trigger
            const link = document.createElement('a');
            link.href = imgData;
            link.download = `${userName}_Digital_Pass.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
        } else if (format === 'pdf') {
            // PDF Document core build pipeline
            const { jsPDF } = window.jspdf;
            
            const pdf = new jsPDF({
                orientation: 'landscape',
                unit: 'mm',
                format: 'a4'
            });

            const imgWidth = 160; 
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            
            const x = (pdf.internal.pageSize.getWidth() - imgWidth) / 2;
            const y = (pdf.internal.pageSize.getHeight() - imgHeight) / 2;

            pdf.addImage(imgData, 'PNG', x, y, imgWidth, imgHeight);
            pdf.save(`${userName}_Digital_Pass.pdf`);
        }
    });
}