/**
 * SAAK International — Trainee Acknowledgement → Google Sheets
 *
 * HOW TO DEPLOY (do this once):
 *   1. Open a new Google Sheet (e.g. name it "Trainee Acknowledgements").
 *   2. Extensions → Apps Script → paste this entire file, replacing the
 *      default `myFunction()` scaffold.
 *   3. Click the save icon.
 *   4. Click "Deploy" → "New deployment"
 *        Type:            Web app
 *        Execute as:      Me
 *        Who has access:  Anyone
 *      → Click Deploy → Authorize → Copy the Web App URL.
 *   5. Paste that URL into `FORM_ENDPOINT` inside
 *      src/components/sections/Acknowledgement.tsx, commit, and push.
 *
 * Every trainee submission then appears as a new row in the sheet with
 * the timestamp, full name, training period, consent flag and language.
 *
 * NOTE: when you edit and re-deploy this script, choose
 *       "Deploy → Manage deployments → Edit → New version" — the URL
 *       stays the same, so no code change is needed on the site.
 */

const SHEET_NAME = 'Sheet1'; // change if your tab has a different name

function doPost(e) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(SHEET_NAME) || ss.getSheets()[0];

    // Add header row on first submission.
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'Timestamp',
        'Full Name',
        'Training Period',
        'Consent',
        'Language',
      ]);
    }

    const p = e.parameter || {};
    sheet.appendRow([
      p.submittedAt || new Date().toISOString(),
      p.fullName || '',
      p.trainingPeriod || '',
      p.consent === 'true' || p.consent === true ? 'Yes' : 'No',
      p.language || 'ar',
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'ok' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(
        JSON.stringify({ status: 'error', message: err.message }),
      )
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Optional sanity check — open the Web App URL in a browser to test.
function doGet() {
  return ContentService.createTextOutput(
    'SAAK International — trainee acknowledgement endpoint is live.',
  );
}
