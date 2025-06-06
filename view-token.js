
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
		new MediaPopout(token.document.texture.src, {
			title,
			shareable: true
		}).render(true)
	  return;
    }
  }
});

// Just a basic popout for media
class MediaPopout extends ImagePopout {
  constructor (src, options = {}) {
    super(src, options)

    this.options.template = 'modules/show-token-art/templates/art-popout.hbs'
  }

  /** @override */
  async getData (options) {
    const data = await super.getData()
    data.isVideo = this.video

    return data
  }
}
