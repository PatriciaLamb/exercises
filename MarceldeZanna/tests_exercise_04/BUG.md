## Warum die Tests scheitern

### 1. **should reject email that is too short**
Die `validateEmail()` Funktion prüft nicht auf eine Mindestlänge. Sie akzeptiert `'a@b'`, obwohl dies keine gültige E-Mail-Struktur ist.

### 2. **should reject email that is too long**
Es gibt keine Längenprüfung. Die Funktion akzeptiert beliebig lange E-Mails, auch wenn sie > 254 Zeichen sind.

### 3. **should not contain more than one @**
Die Funktion prüft nur, ob `@` vorhanden ist (`.includes('@')`), nicht ob es genau einmal vorkommt. `'a@b@.c'` wird akzeptiert.

### 4. **should not allow consecutive dots after @**
Es gibt keine Validierung für aufeinanderfolgende Punkte. `'user@domain..com'` wird akzeptiert.

### 5. **should reject spaces inside the email**
Die Funktion trimmt nur die gesamte E-Mail, aber prüft nicht auf Leerzeichen innerhalb. `'user @example.com'` wird akzeptiert.

### 6. **should reject invalid special characters**
Es gibt keine Validierung für erlaubte Zeichen. Ungültige Zeichen wie `,` werden akzeptiert: `'user,example@example.com'`.

### 7. **should reject leading dot in local part**
Es gibt keine Prüfung des lokalen Teils (vor @). `'.user@example.com'` wird akzeptiert.