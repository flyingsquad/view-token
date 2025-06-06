/**	View token hovered over in a larger window.
 */
 
Hooks.once("setup", () => {
  game.keybindings.register("view-token", "view-token-key", {
    name: "View Token",
    hint: "Display full-size image of hovered token.",
    editable: [{ key: 'KeyV' }],
    restricted: false,
    onDown: viewToken
  });
  
  function viewToken(event) {
	const token = canvas.tokens.hover;
	if (token && !event.repeat) {
		const title = token.document.name;
		new ImagePopout(token.document.texture.src, {
			title,
			shareable: true
		}).render(true)
	  return;
    }
  }
});
