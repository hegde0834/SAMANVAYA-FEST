const fs = require('fs');
const path = require('path');

const target = process.argv[2]?.toLowerCase();
const schemaPath = path.join(__dirname, '..', 'prisma', 'schema.prisma');
const schemaContent = fs.readFileSync(schemaPath, 'utf8');

if (target === 'sqlite') {
  const updated = schemaContent.replace(/provider\s*=\s*"postgresql"/, 'provider = "sqlite"');
  fs.writeFileSync(schemaPath, updated, 'utf8');
  console.log('Switched prisma/schema.prisma to SQLite.');
} else if (target === 'postgres' || target === 'postgresql') {
  const updated = schemaContent.replace(/provider\s*=\s*"sqlite"/, 'provider = "postgresql"');
  fs.writeFileSync(schemaPath, updated, 'utf8');
  console.log('Switched prisma/schema.prisma to PostgreSQL.');
} else {
  console.log('Usage: node scripts/switch-db.js [postgres|sqlite]');
}
