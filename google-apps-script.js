// ════════════════════════════════════════════════════════════════
// Google Apps Script — paste this into your Apps Script editor.
// It receives POST requests from the form and appends rows
// to the active Google Sheet.
// ════════════════════════════════════════════════════════════════

/**
 * Handles incoming POST requests from the complaint form.
 * Appends a new row with: Timestamp | Name | Complaint
 */
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);

    sheet.appendRow([
      data.timestamp || new Date().toLocaleString('bg-BG'),
      data.name || '',
      data.complaint || ''
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Optional: sets up header row when you first run it manually.
 * Run this once from the Apps Script editor (Run > setupSheet).
 */
function setupSheet() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var headers = sheet.getRange('A1:C1');

  // Only write headers if row 1 is empty
  if (!headers.getValues()[0][0]) {
    headers.setValues([['Дата и час', 'Име', 'Оплакване']]);
    headers.setFontWeight('bold');
    headers.setBackground('#667eea');
    headers.setFontColor('#ffffff');
    sheet.setFrozenRows(1);
    sheet.setColumnWidth(1, 180);
    sheet.setColumnWidth(2, 200);
    sheet.setColumnWidth(3, 500);
  }
}
