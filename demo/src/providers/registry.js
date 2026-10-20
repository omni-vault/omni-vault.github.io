// Demo build: generated from src/providers/registry.js by demo/build.mjs
// This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0.
// If a copy of the MPL was not distributed with this file, You can obtain one at https://mozilla.org/MPL/2.0/.
// Copyright (c) 2026 Die OmniVault-Mitwirkenden
import { mark, t } from '../i18n/index.js';
import { demoProvider } from './demo-vault.js';
import META from './providers.json' with { type: 'json' };
const BitwardenProvider = demoProvider(META["bitwarden"]);
const PassboltProvider = demoProvider(META["passbolt"]);
const ProtonPassProvider = demoProvider(META["protonpass"]);
const PassProvider = demoProvider(META["pass"]);
const OnePasswordProvider = demoProvider(META["onepassword"]);
const LastPassProvider = demoProvider(META["lastpass"]);
const KeePassXCProvider = demoProvider(META["keepassxc"]);

// NordPass is postponed (no vault API or CLI).
const providers = [BitwardenProvider, PassboltProvider, KeePassXCProvider, ProtonPassProvider, PassProvider, OnePasswordProvider, LastPassProvider];

export const registry = Object.fromEntries(providers.map((p) => [p.id, p]));

/** Texts of the account form in the interface language (providers declare them in German, see mark()). */
const TEXT_KEYS = new Set(['label', 'hint', 'fileLabel']);
const translateFields = (v) => (Array.isArray(v) ? v.map(translateFields)
  : v && typeof v === 'object' ? Object.fromEntries(Object.entries(v).map(([k, x]) => [k, TEXT_KEYS.has(k) && typeof x === 'string' ? t(x) : translateFields(x)]))
  : v);

export function describeProviders() {
  return providers.map((p) => ({
    id: p.id, label: p.label, status: p.status, note: p.note && t(p.note), configFields: translateFields(p.configFields),
    unlockLabel: t(p.unlockLabel ?? mark('Passwort')),
    unlockOptions: p.unlockOptions ?? [],
    unlockMode: p.unlockMode ?? 'password',
    optionalPermissions: p.optionalPermissions ?? [],
    capabilities: p.capabilities ?? { write: false, types: [] },
  }));
}

export function getProvider(id) {
  const p = registry[id];
  if (!p) throw new Error(t('Unbekannter Anbieter: {id}', { id }));
  return p;
}
