Je nach Methode, die gewählt wird, werden mehrere Header verschickt. Jedoch funktioniert das Absenden des Json Inputs nicht, es steht ständig '405 Method Not Allowed'.

[2026-09-10T17:41:32.151Z]  "POST /" "PostmanRuntime/7.56.1"
[2026-09-10T17:41:32.152Z]  "POST /" Error (404): "Not found"
[2026-09-10T17:41:50.495Z]  "POST /" "PostmanRuntime/7.56.1"
[2026-09-10T17:41:50.496Z]  "POST /" Error (404): "Not found"
[2026-09-10T17:41:56.152Z]  "HEAD /" "PostmanRuntime/7.56.1"
[2026-09-10T17:43:15.075Z]  "PUT /" "PostmanRuntime/7.56.1"
[2026-09-10T17:43:15.075Z]  "PUT /" Error (404): "Not found"
[2026-09-10T17:43:22.238Z]  "PUT /" "PostmanRuntime/7.56.1"

Die Methoden würde ich folgendermaßen einsetzen:
- GET: Daten oder Dateien abrufen
- POST: neue Daten erstellen, zum Beispiel einen Benutzer registrieren
- PUT: vorhandene Daten vollständig aktualisieren
- PATCH: einzelne Eigenschaften vorhandener Daten ändern
- DELETE: Daten löschen
- OPTIONS: unterstützte Methoden und Kommunikationsmöglichkeiten des Servers abfragen