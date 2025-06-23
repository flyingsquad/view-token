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
  game.keybindings.register("view-token", "view-art-key", {
    name: "View Actor Art",
    hint: "Display actor art for hovered token.",
    editable: [
		{
			key: 'KeyV',
			modifiers: ['Shift']
		}
	],
    restricted: false,
    onDown: viewArt
  });
  
  function viewToken(event) {
	const token = canvas.tokens.hover;
	if (token && !event.repeat) {
		const title = game.settings.get('view-token', 'hidename') ? "" : token.document.name;
		new ImagePopout(token.document.texture.src, {
			title,
			shareable: true
		}).render(true)
    }
  }

  function viewArt(event) {
	const token = canvas.tokens.hover;
	if (token && !event.repeat) {
		const actor = game.actors.get(token.document.actorId);
		if (!actor)
			return;
		const title = game.settings.get('view-token', 'hidename') ? "" : actor.name;
		new ImagePopout(actor.img, {
			title,
			shareable: true
		}).render(true)
    }
  }
});

Hooks.once('init', async function () {
	game.settings.register('view-token', 'hidename', {
	  name: 'Hide Names',
	  hint: 'Do not put the name of the token/actor in the window title bar.',
	  scope: 'world',     // "world" = sync to db, "client" = local storage
	  config: true,       // false if you dont want it to show in module config
	  type: Boolean,       // Number, Boolean, String, Object
	  default: false,
	  onChange: value => { // value is the new value of the setting
	  }
	});
});
