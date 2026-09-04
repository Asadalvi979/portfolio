// Minimal, dependency-free renderer for post content.
// Supported: blank-line paragraphs, ## / ### headings, - bullet lists.

function renderInline(text) {
  // Escape HTML first, then apply bold (**text**) and code (`code`).
  const escaped = text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");

  return escaped
    .replace(/\*\*([^*]+)\*\*/g, '<strong class="font-semibold text-text-dark dark:text-text">$1</strong>')
    .replace(
      /`([^`]+)`/g,
      '<code class="px-1.5 py-0.5 rounded-md bg-light-100 dark:bg-dark-200/60 text-accent font-code text-[0.9em]">$1</code>'
    );
}

export default function PostContent({ content }) {
  if (!content) return null;

  const blocks = content.split(/\n\s*\n/);
  const elements = [];
  let listItems = null;
  let key = 0;

  const flushList = () => {
    if (listItems) {
      elements.push(
        <ul
          key={`ul-${key++}`}
          className="space-y-2 my-6 pl-6 list-disc text-light-400 dark:text-muted leading-relaxed"
        >
          {listItems.map((item, i) => (
            <li key={i} dangerouslySetInnerHTML={{ __html: renderInline(item) }} />
          ))}
        </ul>
      );
      listItems = null;
    }
  };

  for (const raw of blocks) {
    const block = raw.trim();
    if (!block) continue;

    const lines = block.split("\n");

    if (lines.every((l) => l.trim().startsWith("-"))) {
      if (!listItems) listItems = [];
      lines.forEach((l) => listItems.push(l.trim().replace(/^-\s*/, "")));
      continue;
    }

    flushList();

    if (block.startsWith("### ")) {
      elements.push(
        <h3
          key={`h3-${key++}`}
          className="text-xl font-bold font-heading text-text-dark dark:text-text mt-8 mb-3"
          dangerouslySetInnerHTML={{ __html: renderInline(block.slice(4)) }}
        />
      );
    } else if (block.startsWith("## ")) {
      elements.push(
        <h2
          key={`h2-${key++}`}
          className="text-2xl font-bold font-heading text-text-dark dark:text-text mt-10 mb-4"
          dangerouslySetInnerHTML={{ __html: renderInline(block.slice(3)) }}
        />
      );
    } else {
      elements.push(
        <p
          key={`p-${key++}`}
          className="text-light-400 dark:text-muted leading-relaxed my-4 text-base md:text-lg"
          dangerouslySetInnerHTML={{ __html: renderInline(block) }}
        />
      );
    }
  }

  flushList();

  return <div>{elements}</div>;
}
