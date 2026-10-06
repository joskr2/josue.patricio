import nextCoreWebVitals from 'eslint-config-next/core-web-vitals'

// React Compiler-era rules that eslint-config-next 16 ships as errors. This
// codebase predates them and relies on two patterns they flag: mount-time state
// reconciliation (reading localStorage / the system theme after hydration) and
// the classic usePrevious ref pattern. Kept visible as warnings so they can be
// addressed incrementally instead of blocking lint.
const reactCompilerMigration = {
  rules: {
    'react-hooks/set-state-in-effect': 'warn',
    'react-hooks/refs': 'warn',
  },
}

const config = [
  {
    ignores: [
      '.next/**',
      'node_modules/**',
      'out/**',
      'build/**',
      'next-env.d.ts',
    ],
  },
  ...nextCoreWebVitals,
  reactCompilerMigration,
]

export default config
