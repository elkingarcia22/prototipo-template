import type { Meta, StoryObj } from '@storybook/html';
import { renderSidebar, createSidebar } from '../../addons/sidebar/src/SidebarProvider';
import { getSidebarConfig } from '../../addons/sidebar/src/configs/sidebarVariants';
import type { SidebarOptions, SidebarVariant } from '../../addons/sidebar/src/types/SidebarOptions';

const meta: Meta<SidebarOptions & { 
  variant?: SidebarVariant;
  activeButton?: string;
}> = {
  title: 'Components/Sidebar',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Componente Sidebar UBITS de navegación lateral con 2 variantes (default/colaborador y admin). Incluye tooltips, menú de perfil, dark mode toggle y ajuste dinámico de altura. Ancho fijo 96px, colores fijos (no cambian con tema).',
      },
    },
    layout: 'fullscreen',
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'admin'],
      description: 'Variante del sidebar: default (colaborador) o admin',
      table: {
        defaultValue: { summary: 'default' },
        type: { summary: 'default | admin' },
      },
    },
    activeButton: {
      control: { type: 'select' },
      options: ['', 'admin', 'aprendizaje', 'diagnóstico', 'desempeño', 'encuestas', 'reclutamiento', 'tareas', 'ubits-ai', 'inicio', 'empresa'],
      description: 'Sección activa del sidebar (depende de la variante)',
      table: {
        defaultValue: { summary: '' },
        type: { summary: 'string' },
      },
    },
    darkModeEnabled: {
      control: { type: 'boolean' },
      description: 'Si el dark mode toggle está habilitado',
      table: {
        defaultValue: { summary: 'true' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<SidebarOptions & { variant?: SidebarVariant; activeButton?: string }>;

// Función helper para obtener configuración según variante
function getSidebarButtons(variant: SidebarVariant) {
  const config = getSidebarConfig(variant);
  return {
    bodyButtons: config.bodyButtons,
    footerButtons: config.footerButtons,
    profileMenuItems: config.profileMenuItems
  };
}

// Función para actualizar botón activo
function updateActiveButton(buttons: any[], activeButton: string) {
  return buttons.map(btn => ({
    ...btn,
    state: btn.section === activeButton ? 'active' as const : 'default' as const
  }));
}

export const Default: Story = {
  args: {
    containerId: 'sidebar-story-container',
    variant: 'default',
    activeButton: '',
    darkModeEnabled: true,
    logoImage: '../../../../template-ubits/images/Ubits-logo.svg',
    avatarImage: '../../../../template-ubits/images/Profile-image.jpg',
  } as SidebarOptions & { variant?: SidebarVariant; activeButton?: string },
  render: (args) => {
    // Asegurar que el contenedor existe
    let container = document.getElementById(args.containerId || 'sidebar-story-container');
    if (!container) {
      container = document.createElement('div');
      container.id = args.containerId || 'sidebar-story-container';
      container.style.cssText = `
        position: relative;
        width: 96px;
        height: 650px;
        margin: 20px auto;
      `;
      document.body.appendChild(container);
    } else {
      container.innerHTML = '';
    }

    const variant = args.variant || 'default';
    const activeButton = args.activeButton || '';
    const config = getSidebarButtons(variant);
    
    // Actualizar botones con estado activo
    const bodyButtons = updateActiveButton(config.bodyButtons, activeButton);
    const footerButtons = activeButton ? updateActiveButton(config.footerButtons || [], activeButton) : config.footerButtons || [];

    const sidebarOptions: SidebarOptions = {
      containerId: container.id,
      variant: variant,
      bodyButtons: bodyButtons,
      footerButtons: footerButtons,
      profileMenuItems: config.profileMenuItems,
      logoHref: variant === 'admin' ? 'admin.html' : 'index.html',
      logoImage: args.logoImage || '../../../../template-ubits/images/Ubits-logo.svg',
      avatarImage: args.avatarImage || '../../../../template-ubits/images/Profile-image.jpg',
      darkModeEnabled: args.darkModeEnabled !== false,
      height: 650,
      onActiveButtonChange: (section) => {
        console.log('Active button changed:', section);
      },
      onDarkModeToggle: (isDark) => {
        console.log('Dark mode toggled:', isDark);
        // Actualizar atributo del body
        document.body.setAttribute('data-theme', isDark ? 'dark' : 'light');
      },
      onAvatarClick: () => {
        console.log('Avatar clicked');
      }
    };

    try {
      createSidebar(sidebarOptions);
    } catch (error) {
      console.error('Error creating sidebar:', error);
      // Fallback: renderizar HTML estático
      const sidebarHTML = renderSidebar(sidebarOptions);
      container.innerHTML = sidebarHTML;
    }

    // Agregar información del sidebar
    const info = document.createElement('div');
    info.style.cssText = `
      margin-top: 24px;
      padding: 16px;
      background: var(--ubits-bg-2, #f9fafb);
      border-radius: 8px;
      font-size: 14px;
      color: var(--ubits-fg-1-medium, #5c646f);
      border: 1px solid var(--ubits-border-1);
      line-height: 1.6;
    `;
    info.innerHTML = `
      <strong>Variante:</strong> ${variant}<br>
      <strong>Botón activo:</strong> ${activeButton || 'Ninguno'}<br>
      <strong>Dark mode:</strong> ${args.darkModeEnabled !== false ? 'Habilitado' : 'Deshabilitado'}<br>
      <br>
      <em>Haz hover sobre los botones para ver los tooltips. Haz hover sobre el avatar para ver el menú de perfil. Haz clic en el botón de dark mode para cambiar el tema.</em>
    `;
    container.appendChild(info);

    return container;
  },
};

