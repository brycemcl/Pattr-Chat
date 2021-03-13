/* mainview component - acts as the gateway into our application is split into the:
 * sidebar, containing a header, orgswitcher, sidebar header etc...
 * main body , containing a title of currently selected chat, message text, composer etc... */
function MainView ({ children }) {
  return (
    <>
      <div>{children}</div>
      {/* <Header />
      <Sidebar>
        <SidebarHeader>
          <OrgSwitcher />
          <NewMessage />
        </SidebarHeader>
        <SidebarMain>
          <AllChannels />
          <DirectMessages />
        </SidebarMain>
      </Sidebar>
      <Body>
        <BodyHeader>
          <Title />
        </BodyHeader>
        <BodyMain>
          <ViewThread>
            <Body>
              <Message />
            </Body>
            <Composer />
          </ViewThread>
        </BodyMain>
      </Body> */}
    </>
  )
}

// export our default MainView component we declared above
export default MainView
