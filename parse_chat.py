import re

with open('/tmp/eq_0.txt') as f:
    raw = f.read()

text_blocks = re.findall(r'\"([^\"]{50,})\"', raw)

full_doc = []
seen = set()
for b in text_blocks:
    clean = b.replace(r'\n', '\n').replace(r'\"', '"').replace(r'\\', '\\')
    if clean not in seen:
        seen.add(clean)
        full_doc.append(clean)

combined = '\n\n'.join(full_doc)
with open('/tmp/extracted_chat_doc.md', 'w') as out:
    out.write(combined)

print('Saved extracted chat doc, length:', len(combined))
