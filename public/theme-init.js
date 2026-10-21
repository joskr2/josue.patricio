/*
 * Pre-paint theme bootstrap. Loaded async with blocking="render" from the
 * root layout (src/app/[locale]/layout.tsx), so it runs before the first
 * paint and no light-to-dark flash is ever visible.
 *
 * Deliberately written in old-school ES5: files in public/ are served as-is
 * (no transpilation), and this must execute in every browser that can parse
 * the site's HTML.
 *
 * Mirrors the next-themes configuration used by the app: attribute="class",
 * storageKey="theme", defaultTheme="system" (via prefers-color-scheme) and
 * enableColorScheme. Keep in sync if the ThemeProvider config in
 * src/app/providers.tsx ever changes.
 */
!function () {
  try {
    var d = document.documentElement, c = d.classList;
    c.remove('light', 'dark');
    var e = localStorage.getItem('theme');
    var t = e || 'system';
    var k = t === 'dark' || (t === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    c.add(k ? 'dark' : 'light');
    d.style.colorScheme = k ? 'dark' : 'light';
  } catch (e) {}
}()
