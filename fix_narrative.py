import re

with open(r'c:\Sagar\Projects\Websites\Games\Murdle\src\engine\narrative.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Fix description: `...' -> description: "..."
# Pattern: description: `...', (where the string ends with ','
# The backtick is the opening, ' is the broken closing
content = re.sub(
    r"description: `((?:[^`']|`(?!,))*?)',",
    lambda m: 'description: "' + m.group(1).replace('`s ', "'s ").replace('`t ', "'t ").replace("\\`s ", "'s ").replace("\\`t ", "'t ") + '",',
    content
)

# Fix locationClue: `...' -> locationClue: "..."
content = re.sub(
    r"locationClue: `((?:[^`']|`(?!,))*?)',",
    lambda m: 'locationClue: "' + m.group(1) + '",',
    content
)

# Fix traceFeature: `...' -> traceFeature: "..."
content = re.sub(
    r"traceFeature: `((?:[^`']|`(?!,))*?)',",
    lambda m: 'traceFeature: "' + m.group(1) + '",',
    content
)

# Fix descriptor: `...' -> descriptor: "..."
content = re.sub(
    r"descriptor: `((?:[^`']|`(?!,))*?)',",
    lambda m: 'descriptor: "' + m.group(1) + '",',
    content
)

# Also fix well-formed backtick strings (no broken ending) for description/locationClue/traceFeature/descriptor
content = re.sub(r'description: `([^`]*)`', lambda m: 'description: "' + m.group(1) + '"', content)
content = re.sub(r'locationClue: `([^`]*)`', lambda m: 'locationClue: "' + m.group(1) + '"', content)
content = re.sub(r'traceFeature: `([^`]*)`', lambda m: 'traceFeature: "' + m.group(1) + '"', content)
content = re.sub(r'descriptor: `([^`]*)`', lambda m: 'descriptor: "' + m.group(1) + '"', content)

# Fix any \" (escaped double quotes inside double-quoted strings) that were remnants from earlier transforms
# Replace \" inside strings with apostrophe constructs
content = content.replace('\\"s ', "'s ")
content = content.replace('\\"t ', "'t ")
content = content.replace('\\"s been', "'s been")

# Fix backstory: `...'  -> backstory: "..."
content = re.sub(r"backstory: `([^`]*)',", lambda m: 'backstory: "' + m.group(1) + '",', content)
content = re.sub(r'backstory: `([^`]*)`', lambda m: 'backstory: "' + m.group(1) + '"', content)

with open(r'c:\Sagar\Projects\Websites\Games\Murdle\src\engine\narrative.ts', 'w', encoding='utf-8') as f:
    f.write(content)

print("Done! Checking for remaining backtick strings...")
import re
with open(r'c:\Sagar\Projects\Websites\Games\Murdle\src\engine\narrative.ts', 'r', encoding='utf-8') as f:
    lines = f.readlines()

issues = []
for i, line in enumerate(lines, 1):
    if 'backstory:' in line or 'description:' in line or 'locationClue:' in line or 'traceFeature:' in line or 'descriptor:' in line:
        if '`' in line:
            issues.append(f"Line {i}: {line.strip()[:100]}")

if issues:
    print("Still problematic lines:")
    for issue in issues:
        print(issue)
else:
    print("All clear!")
