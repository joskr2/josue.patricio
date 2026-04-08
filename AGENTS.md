# Agent Configuration — josue-portfolio

## Project Context

This is a personal portfolio website built with **TanStack Start** (SSR hybrid, Vite + Nitro + TanStack Router).

## Skills

If you are an AI agent working on this project:

1. **Discover skills**: Run `npx @tanstack/intent@latest list` to find available skills
2. **Install skills mapping**: Run `npx @tanstack/intent@latest install` to update this file with skill-to-task mappings

The portfolio skill is located at `./skills/portfolio/SKILL.md` and teaches:
- File-based routing patterns (TanStack Start)
- SSR + loader patterns
- Cookie-based i18n (SSR-compatible)
- Image handling (no next/image)
- External vs internal links
- Build commands and Vercel deployment

## MCP Servers

This project includes MCP server configuration in `mcp.json`:

- **memory**: Persistent memory across sessions via `@modelcontextprotocol/server-memory`
- **filesystem**: Access to project files via `@modelcontextprotocol/server-filesystem` (allowed path: `/Users/josue/Documents/josue.patricio`)

To use MCP servers, configure your AI client to read `mcp.json` from the project root.

## Quick Reference

```bash
# Dev server
npm run dev

# Build
npm run build

# Preview production
npm run start
```

## Architecture Notes

- Routes: `src/routes/` (file-based, TanStack Start)
- Components: `src/components/` (vanilla React, no framework imports)
- i18n: Cookie-based (SSR-compatible), not Context API
- Images: Standard `<img>` tag, assets in `/public`
- External links: Use `<a>` tag, not TanStack Router's `<Link>`
- CSS: `@import "tailwindcss"` in `src/styles/tailwind.css`