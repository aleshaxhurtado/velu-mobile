import { writable } from 'svelte/store';

/**
 * Store global para guardar el evento beforeinstallprompt
 *
 * Este store evita que el evento se pierda cuando:
 * - El evento se dispara ANTES de que los componentes de Svelte se monten (problema de timing)
 * - Los componentes se montan/desmontan durante la navegación
 *
 * IMPORTANTE: Este proyecto usa CSR (ssr = false), pero el problema puede ocurrir igual
 * porque el evento del navegador puede dispararse antes de que Svelte esté listo.
 *
 * Solución: El evento se captura en app.html (fuera del ciclo de Svelte) y se transfiere
 * a este store cuando +layout.svelte se monta.
 */
export const installPromptEvent = writable(null);
