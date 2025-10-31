import type { Meta, StoryObj } from '@storybook/html';
import { renderList, createList } from '../../addons/list/src/ListProvider';
import type { ListOptions, ListItem, ListItemState } from '../../addons/list/src/types/ListOptions';

const meta: Meta<ListOptions & { 
  item1State?: ListItemState;
  item2State?: ListItemState;
  item3State?: ListItemState;
  item4State?: ListItemState;
}> = {
  title: 'Components/List',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Componente List UBITS para mostrar listas de items con estados (default, hover, active, disabled). Soporta 4 tamaños (xs, sm, md, lg), scrollbar personalizado, navegación por teclado y selección simple o múltiple.',
      },
    },
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg'],
      description: 'Tamaño de los items de la lista',
      table: {
        defaultValue: { summary: 'md' },
        type: { summary: 'xs | sm | md | lg' },
      },
    },
    maxHeight: {
      control: { type: 'text' },
      description: 'Altura máxima de la lista (para scroll)',
      table: {
        defaultValue: { summary: '400px' },
        type: { summary: 'string' },
      },
    },
    multiple: {
      control: { type: 'boolean' },
      description: 'Si la lista permite selección múltiple',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    item1State: {
      control: { type: 'select' },
      options: ['default', 'hover', 'active', 'disabled'],
      description: 'Estado del item 1',
      table: {
        defaultValue: { summary: 'default' },
        type: { summary: 'default | hover | active | disabled' },
      },
    },
    item2State: {
      control: { type: 'select' },
      options: ['default', 'hover', 'active', 'disabled'],
      description: 'Estado del item 2',
      table: {
        defaultValue: { summary: 'default' },
        type: { summary: 'default | hover | active | disabled' },
      },
    },
    item3State: {
      control: { type: 'select' },
      options: ['default', 'hover', 'active', 'disabled'],
      description: 'Estado del item 3',
      table: {
        defaultValue: { summary: 'default' },
        type: { summary: 'default | hover | active | disabled' },
      },
    },
    item4State: {
      control: { type: 'select' },
      options: ['default', 'hover', 'active', 'disabled'],
      description: 'Estado del item 4',
      table: {
        defaultValue: { summary: 'default' },
        type: { summary: 'default | hover | active | disabled' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<ListOptions & { 
  item1State?: ListItemState;
  item2State?: ListItemState;
  item3State?: ListItemState;
  item4State?: ListItemState;
}>;

// Helper para crear items con estados individuales
function createItems(item1State: ListItemState = 'default', item2State: ListItemState = 'default', item3State: ListItemState = 'default', item4State: ListItemState = 'default'): ListItem[] {
  return [
    { label: 'Label 1', state: item1State, value: 'item-1', selected: item1State === 'active' },
    { label: 'Label 2', state: item2State, value: 'item-2', selected: item2State === 'active' },
    { label: 'Label 3', state: item3State, value: 'item-3', selected: item3State === 'active' },
    { label: 'Label 4', state: item4State, value: 'item-4', selected: item4State === 'active' },
  ];
}

export const Default: Story = {
  args: {
    containerId: 'list-story-container',
    size: 'md',
    maxHeight: '400px',
    multiple: false,
    item1State: 'default',
    item2State: 'default',
    item3State: 'default',
    item4State: 'default',
  },
  render: (args) => {
    // Crear contenedor
    const container = document.createElement('div');
    container.style.padding = '20px';
    container.style.background = 'var(--ubits-bg-1, #ffffff)';
    container.style.borderRadius = '8px';
    
    // Preview container
    const preview = document.createElement('div');
    preview.style.display = 'flex';
    preview.style.flexDirection = 'column';
    preview.style.gap = '24px';
    
    // Info panel
    const infoPanel = document.createElement('div');
    infoPanel.style.padding = '16px';
    infoPanel.style.background = 'var(--ubits-bg-2, #f9fafb)';
    infoPanel.style.borderRadius = '8px';
    infoPanel.style.border = '1px solid var(--ubits-border-1, #e5e7eb)';
    infoPanel.innerHTML = `
      <div style="margin-bottom: 12px;">
        <strong style="color: var(--ubits-fg-1-high, #303a47); font-size: 14px;">Configuración:</strong>
      </div>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px; font-size: 13px; color: var(--ubits-fg-1-medium, #5c646f);">
        <div><strong>Tamaño:</strong> ${args.size || 'md'}</div>
        <div><strong>Altura máxima:</strong> ${args.maxHeight || '400px'}</div>
        <div><strong>Selección múltiple:</strong> ${args.multiple ? 'Sí' : 'No'}</div>
        <div><strong>Item 1:</strong> ${args.item1State || 'default'}</div>
        <div><strong>Item 2:</strong> ${args.item2State || 'default'}</div>
        <div><strong>Item 3:</strong> ${args.item3State || 'default'}</div>
        <div><strong>Item 4:</strong> ${args.item4State || 'default'}</div>
      </div>
    `;
    
    // List container
    const listContainer = document.createElement('div');
    listContainer.id = args.containerId || 'list-story-container';
    listContainer.style.width = '100%';
    listContainer.style.maxWidth = '400px';
    
    // Crear items con estados individuales
    const items = createItems(
      args.item1State || 'default',
      args.item2State || 'default',
      args.item3State || 'default',
      args.item4State || 'default'
    );
    
    // Crear lista usando createList para funcionalidad completa
    try {
      const listOptions: ListOptions = {
        containerId: listContainer.id,
        items,
        size: args.size || 'md',
        maxHeight: args.maxHeight || '400px',
        multiple: args.multiple || false,
        onSelectionChange: (selectedItem, index) => {
          console.log('List item selected:', { selectedItem, index });
        },
      };
      
      createList(listOptions);
    } catch (error) {
      // Si falla createList (porque el contenedor no está en DOM), usar renderList
      console.warn('Using renderList fallback:', error);
      const listHTML = renderList({
        containerId: listContainer.id,
        items,
        size: args.size || 'md',
        maxHeight: args.maxHeight || '400px',
      });
      listContainer.innerHTML = listHTML;
    }
    
    preview.appendChild(infoPanel);
    preview.appendChild(listContainer);
    container.appendChild(preview);
    
    // Re-inicializar cuando cambian los argumentos (Storybook re-renderiza)
    const updateList = () => {
      try {
        const existingList = document.getElementById(listContainer.id);
        if (!existingList) return;
        
        // Limpiar y recrear
        existingList.innerHTML = '';
        
        const items = createItems(
          args.item1State || 'default',
          args.item2State || 'default',
          args.item3State || 'default',
          args.item4State || 'default'
        );
        
        const listOptions: ListOptions = {
          containerId: listContainer.id,
          items,
          size: args.size || 'md',
          maxHeight: args.maxHeight || '400px',
          multiple: args.multiple || false,
          onSelectionChange: (selectedItem, index) => {
            console.log('List item selected:', { selectedItem, index });
          },
        };
        
        createList(listOptions);
      } catch (error) {
        console.warn('Could not initialize list:', error);
      }
    };
    
    // Esperar a que se monte en DOM para inicializar
    setTimeout(updateList, 100);
    
    // Re-inicializar cuando cambien los args (para Storybook)
    if (typeof window !== 'undefined') {
      const observer = new MutationObserver(() => {
        const existingList = document.getElementById(listContainer.id);
        if (existingList && !existingList.querySelector('.ubits-list')) {
          updateList();
        }
      });
      
      setTimeout(() => {
        const existingList = document.getElementById(listContainer.id);
        if (existingList) {
          observer.observe(existingList, { childList: true, subtree: true });
        }
      }, 200);
    }
    
    return container;
  },
};


