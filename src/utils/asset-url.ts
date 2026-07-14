// Seed/mock data stores image paths as plain root-absolute strings
// (e.g. "/assets/images/product/product-1.webp"), not `import`s - so Vite's
// own base-URL-aware asset rewriting never touches them. That's invisible
// when deployed at "/", but this app is also built with a non-root base
// (see the build-stage script, --base=/stage/), and under that a literal
// "/assets/..." string resolves to the wrong host-root URL instead of
// "/stage/assets/...". Route every such path through this helper instead
// of using it directly.
export function assetUrl(path: string | undefined | null): string | undefined {
  if (!path) return path ?? undefined;
  if (/^https?:\/\//.test(path)) return path;
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}/${path.replace(/^\//, '')}`;
}
