<script>
  import { onMount, onDestroy } from 'svelte';
  import { goto } from '$app/navigation';
  import Button from '$lib/components/atoms/Button/Button.svelte';
  import { Capacitor } from '@capacitor/core';
  import { browser } from '$app/environment';
  import { installPromptEvent } from '$lib/stores/pwa';
  // Tokens CSS ya están disponibles globalmente desde +layout.svelte

  let promptEvent = $state(null);
  let isInstallable = $state(false);
  let isInstalled = $state(false);
  let showManualInstructions = $state(false);
  let browserType = $state('unknown');
  let unsubscribe;

  onMount(() => {
    // Nota: Esta página solo debería ser accesible desde web
    // +page.svelte ya valida esto antes de redirigir aquí,
    // pero mantenemos esta validación como seguridad defensiva
    if (Capacitor.isNativePlatform()) {
      goto('/onboarding');
      return;
    }

    // Detectar tipo de navegador
    detectBrowser();

    // Verificar si ya está instalada
    if (window.matchMedia('(display-mode: standalone)').matches) {
      isInstalled = true;
      setTimeout(() => {
        goto('/onboarding');
      }, 2000);
      return;
    }

    // Suscribirse al store del evento beforeinstallprompt
    unsubscribe = installPromptEvent.subscribe((event) => {
      promptEvent = event;
      isInstallable = !!event;
      // Si hay prompt disponible, ocultar instrucciones manuales
      if (event) {
        showManualInstructions = false;
      }
    });

    // Escuchar cuando la app se instala
    window.addEventListener('appinstalled', handleAppInstalled);

    // Si después de 1 segundo no hay prompt disponible, mostrar instrucciones manuales
    setTimeout(() => {
      if (!isInstallable && !isInstalled) {
        showManualInstructions = true;
      }
    }, 1000);
  });

  onDestroy(() => {
    if (unsubscribe) {
      unsubscribe();
    }
    window.removeEventListener('appinstalled', handleAppInstalled);
  });

  function detectBrowser() {
    if (!browser) return;

    const userAgent = navigator.userAgent.toLowerCase();
    const isIOS = /iphone|ipad|ipod/.test(userAgent);
    const isAndroid = /android/.test(userAgent);
    const isChrome = /chrome/.test(userAgent) && !/edg/.test(userAgent);
    const isSafari = /safari/.test(userAgent) && !/chrome/.test(userAgent);
    const isFirefox = /firefox/.test(userAgent);
    const isEdge = /edg/.test(userAgent);

    if (isIOS) {
      browserType = 'ios';
    } else if (isAndroid) {
      browserType = 'android';
    } else if (isChrome) {
      browserType = 'chrome';
    } else if (isSafari) {
      browserType = 'safari';
    } else if (isFirefox) {
      browserType = 'firefox';
    } else if (isEdge) {
      browserType = 'edge';
    }
  }

  function handleAppInstalled() {
    isInstalled = true;
    isInstallable = false;
    promptEvent = null;
    installPromptEvent.set(null);
    // Redirigir al onboarding después de instalar
    setTimeout(() => {
      goto('/onboarding');
    }, 1500);
  }

  async function installApp() {
    if (!promptEvent) {
      console.warn('El prompt de instalación no está disponible');
      return;
    }

    try {
      // Mostrar el prompt
      promptEvent.prompt();

      // Esperar respuesta del usuario
      const choiceResult = await promptEvent.userChoice;

      if (choiceResult.outcome === 'accepted') {
        console.log('Usuario aceptó instalar la app');
        isInstalled = true;
      } else {
        console.log('Usuario rechazó instalar la app');
      }

      // Limpiar
      promptEvent = null;
      installPromptEvent.set(null);
      isInstallable = false;
    } catch (error) {
      console.error('Error al instalar la app:', error);
    }
  }

  function skipInstallation() {
    goto('/onboarding');
  }
</script>

{#if isInstalled}
  <div class="install-page">
    <div class="content">
      <div class="success-icon">✓</div>
      <h1>¡App Instalada!</h1>
      <p>Redirigiendo...</p>
    </div>
  </div>
{:else}
  <div class="install-page">
    <div class="content">
      <h1>Descarga Velu</h1>
      <p class="description">
        Instala nuestra app para una mejor experiencia y acceso rápido desde tu pantalla de inicio.
      </p>

      {#if isInstallable}
        <Button fill onclick={installApp}>Descargar App</Button>
        <button class="skip-button" onclick={skipInstallation}>Continuar sin instalar</button>
      {:else if showManualInstructions}
        <div class="manual-instructions">
          <h2>Instala Velu en tu dispositivo</h2>

          {#if browserType === 'ios'}
            <div class="instruction-steps">
              <div class="step">
                <span class="step-number">1</span>
                <p>
                  Toca el botón <strong>Compartir</strong> <span class="icon">📤</span> en la parte inferior
                  de la pantalla
                </p>
              </div>
              <div class="step">
                <span class="step-number">2</span>
                <p>
                  Desplázate hacia abajo y selecciona <strong>"Agregar a pantalla de inicio"</strong
                  >
                </p>
              </div>
              <div class="step">
                <span class="step-number">3</span>
                <p>Toca <strong>"Agregar"</strong> en la esquina superior derecha</p>
              </div>
            </div>
          {:else if browserType === 'android'}
            <div class="instruction-steps">
              <div class="step">
                <span class="step-number">1</span>
                <p>Toca el menú <span class="icon">⋮</span> en la esquina superior derecha</p>
              </div>
              <div class="step">
                <span class="step-number">2</span>
                <p>
                  Selecciona <strong>"Instalar app"</strong> o
                  <strong>"Agregar a pantalla de inicio"</strong>
                </p>
              </div>
              <div class="step">
                <span class="step-number">3</span>
                <p>Confirma la instalación tocando <strong>"Instalar"</strong></p>
              </div>
            </div>
          {:else}
            <div class="instruction-steps">
              <div class="step">
                <span class="step-number">1</span>
                <p>
                  Busca el icono de instalación <span class="icon">➕</span> en la barra de direcciones
                </p>
              </div>
              <div class="step">
                <span class="step-number">2</span>
                <p>Haz clic en el icono y selecciona <strong>"Instalar"</strong></p>
              </div>
              <div class="step">
                <span class="step-number">3</span>
                <p>Confirma la instalación en el diálogo que aparece</p>
              </div>
            </div>
          {/if}

          <div class="visual-guide">
            <p class="hint">💡 La app aparecerá en tu pantalla de inicio como una app nativa</p>
          </div>
        </div>
        <button class="skip-button" onclick={skipInstallation}>Continuar sin instalar</button>
      {:else}
        <div class="loading-state">
          <p>Preparando instalación...</p>
        </div>
        <button class="skip-button" onclick={skipInstallation}>Continuar sin instalar</button>
      {/if}
    </div>
  </div>
{/if}

<style>
  .install-page {
    width: 100%;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: var(--spacing-lg);
    background: var(--bg);
  }

  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--spacing-lg);
    text-align: center;
    max-width: 500px;
    width: 100%;
  }

  .success-icon {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background: var(--primary);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 48px;
    font-weight: bold;
    margin-bottom: var(--spacing-md);
  }

  h1 {
    font-size: var(--font-size-4xl);
    font-weight: bold;
    margin: 0;
    color: var(--text);
  }

  .description {
    font-size: var(--font-size-lg);
    color: var(--text-light);
    margin: 0;
    line-height: 1.6;
  }

  .skip-button {
    background: none;
    border: none;
    color: var(--text-light);
    font-size: var(--font-size-base);
    cursor: pointer;
    padding: var(--spacing-sm);
    text-decoration: underline;
    transition: opacity 0.2s;
  }

  .skip-button:hover {
    opacity: 0.7;
  }

  .loading-state {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm);
    margin-top: var(--spacing-md);
  }

  .loading-state p {
    margin: 0;
    color: var(--text-light);
  }

  .hint {
    font-size: var(--font-size-sm);
    opacity: 0.7;
  }

  .manual-instructions {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-lg);
    width: 100%;
    margin-top: var(--spacing-md);
  }

  .manual-instructions h2 {
    font-size: var(--font-size-2xl);
    font-weight: bold;
    margin: 0;
    color: var(--text);
  }

  .instruction-steps {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
    text-align: left;
  }

  .step {
    display: flex;
    align-items: flex-start;
    gap: var(--spacing-md);
    padding: var(--spacing-md);
    background: var(--bg-light);
    border-radius: var(--radius-md);
  }

  .step-number {
    flex-shrink: 0;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--primary);
    color: white;
    border-radius: 50%;
    font-weight: bold;
    font-size: var(--font-size-lg);
  }

  .step p {
    margin: 0;
    color: var(--text);
    font-size: var(--font-size-base);
    line-height: 1.6;
    flex: 1;
  }

  .step strong {
    color: var(--primary);
    font-weight: 600;
  }

  .icon {
    font-size: 1.2em;
    display: inline-block;
  }

  .visual-guide {
    margin-top: var(--spacing-md);
    padding: var(--spacing-md);
    background: rgba(var(--primary-rgb, 14, 165, 233), 0.1);
    border-radius: var(--radius-md);
    border-left: 4px solid var(--primary);
  }

  .visual-guide .hint {
    margin: 0;
    color: var(--text);
    font-size: var(--font-size-base);
  }
</style>
