import { create } from 'zustand'

export interface Link {
  code: string
  link: string
  accessCount: number
}

type State = {
 links: Link[]
}

type Actions = {
  setLinks: (links: Link[]) => void
  addLink: (link: Link) => void
  remoteLink: (code: string) => void
  updateCount: (code: string) => void
}

export const useLinkStore = create<State & Actions>((set) => ({
  links: [],
  setLinks: (links: Link[]) => set({ links }),
  remoteLink: (code: string) => set((state) => ({
    links: state.links.filter(link => link.code !== code)
  })),
  updateCount: (code: string) => set((state) => ({
    links: state.links.map(link => link.code === code ? { ...link, accessCount: link.accessCount + 1 } : link)
  })),
  addLink: (link: Link) => set((state) => ({
    links: [link, ...state.links]
  }))
}))