
import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';

const useStore = create((set, get) => ({
  layout: [
    { i: 'a', x: 0, y: 0, w: 12, h: 1 },
    { i: 'b', x: 0, y: 1, w: 12, h: 2 },
  ],
  elements: [
    { id: 'a', type: 'text', content: 'John Doe' },
    { id: 'b', type: 'text', content: 'Software Engineer' },
  ],
  selectedElementId: null,
  
  // Derived state
  selectedElement: () => {
    const { elements, selectedElementId } = get();
    return elements.find(el => el.id === selectedElementId) || null;
  },

  // Actions
  setLayout: (newLayout) => set({ layout: newLayout }),
  
  addElement: (elementType) => set((state) => {
    const newId = uuidv4();
    const newElement = {
      id: newId,
      type: elementType,
      content: `New ${elementType}`,
    };

    const newLayoutItem = {
      i: newId,
      x: 0,
      y: Infinity, // This will place the new item at the bottom
      w: 12,
      h: 1,
    };

    return {
      elements: [...state.elements, newElement],
      layout: [...state.layout, newLayoutItem],
    };
  }),

  setSelectedElementId: (id) => set({ selectedElementId: id }),

  updateElementContent: (id, newContent) => set((state) => ({
    elements: state.elements.map(el => 
      el.id === id ? { ...el, content: newContent } : el
    ),
  })),
}));

export default useStore;
