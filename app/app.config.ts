export default defineAppConfig({
  ui: {
      card: {
          slots: {
            root: "ring-2 ring-primary"
          }
      },
      pageCard: {
            slots: {
                title: "text-xl font-bold"
            }
      },
      navigationMenu: {
            slots: {
                link: "text-md",
                root: "gap-3",
                linkLeadingIcon: "size-6",
                childLinkIcon: "size-6",
            }
      }
  }
})