/**
 * Composable para manejar el estado de loading en páginas
 *
 * @example
 * ```svelte
 * <script>
 *   import Loading from '$lib/components/atoms/Loading/Loading.svelte';
 *   import { useLoading } from '$lib/composables/useLoading';
 *
 *   const loading = useLoading();
 *
 *   async function loadData() {
 *     loading.setLoading(true, 'Cargando datos...');
 *     try {
 *       await fetchData();
 *     } finally {
 *       loading.setLoading(false);
 *     }
 *   }
 * </script>
 *
 * <Loading bind:isLoading={loading.isLoading} message={loading.message} />
 * ```
 */
export function useLoading() {
  const isLoading = $state(false);
  const message = $state('Cargando...');

  function setLoading(loading, loadingMessage = 'Cargando...') {
    isLoading = loading;
    if (loading) {
      message = loadingMessage;
    }
  }

  return {
    get isLoading() {
      return isLoading;
    },
    get message() {
      return message;
    },
    setLoading,
  };
}
