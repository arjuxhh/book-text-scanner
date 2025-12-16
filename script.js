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
  const doc = new jsPDF();

  const text = textOutput.value;
  const lines = doc.splitTextToSize(text, 180);

  doc.text(lines, 10, 10);
  doc.save("Book_Text.pdf");
}
