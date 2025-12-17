const statusText = document.getElementById("status");
const textOutput = document.getElementById("textOutput");

async function scanImages() {
  const files = document.getElementById("imageInput").files;

  if (files.length === 0) {
    alert("Please select images");
    return;
  }

  textOutput.value = "";
  statusText.innerText = "Scanning pages...";

  for (let i = 0; i < files.length; i++) {
    statusText.innerText = `Scanning page ${i + 1} of ${files.length}...`;

    const result = await Tesseract.recognize(
      files[i],
      'eng',
      {
        logger: m => console.log(m)
      }
    );

    textOutput.value += `\n\n--- Page ${i + 1} ---\n\n`;
    textOutput.value += result.data.text;
  }

  statusText.innerText = "✅ Scanning completed. You can edit text now.";
}

function generatePDF() {
  const { jsPDF } = window.jspdf;

  // Get margin values from inputs
  const marginTop = parseInt(document.getElementById("marginTop").value) || 10;
  const marginBottom = parseInt(document.getElementById("marginBottom").value) || 10;
  const marginLeft = parseInt(document.getElementById("marginLeft").value) || 10;
  const marginRight = parseInt(document.getElementById("marginRight").value) || 10;

  const doc = new jsPDF();

  const text = textOutput.value;
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  const maxLineWidth = pageWidth - marginLeft - marginRight;

  // Split text into lines fitting the width
  const lines = doc.splitTextToSize(text, maxLineWidth);

  // Start writing from top margin
  let y = marginTop;
  for (let i = 0; i < lines.length; i++) {
    if (y > pageHeight - marginBottom) {
      doc.addPage();
      y = marginTop;
    }
    doc.text(lines[i], marginLeft, y);
    y += 7; // line height, you can adjust
  }

  doc.save("Book_Text.pdf");
}

async function scanImages() {
  const files = document.getElementById("imageInput").files;

  if (files.length === 0) {
    alert("Please select images");
    return;
  }

  // Show loading overlay
  document.getElementById("loadingOverlay").style.display = "flex";

  textOutput.value = "";
  statusText.innerText = "Scanning pages...";

  for (let i = 0; i < files.length; i++) {
    statusText.innerText = `Scanning page ${i + 1} of ${files.length}...`;

    // Optional: preprocess the image here before OCR
    const result = await Tesseract.recognize(
      files[i],
      'eng',
      {
        logger: m => console.log(m)
      }
    );

    textOutput.value += `\n\n--- Page ${i + 1} ---\n\n`;
    textOutput.value += result.data.text;
  }

  // Hide loading overlay
  document.getElementById("loadingOverlay").style.display = "none";

  statusText.innerText = "✅ Scanning completed. You can edit text now.";
}
