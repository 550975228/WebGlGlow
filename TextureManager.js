

function TextureManager()
{
	this.LoadedTextures ={};
	
	this.getTexture = function loadTexture(fileName, textureOptions, forceReload)
	
	{
	/*
		if (textureOptions === undefined)
		{
			textureOptions = globalFilterOptions;
		
		}
	*/
		if (this.LoadedTextures[fileName] !== undefined)
		{
			return this.LoadedTextures[fileName];
		}
		
		else
		{
		var texture = gl.createTexture();
		
		texture.options = textureOptions;
		texture.image = new Image();
		texture.image.onload = function()
		{
			handleLoadedTexture(texture)
		}
		
		texture.image.src = "textures/"+fileName;
		
		this.LoadedTextures[fileName] = texture;
		return texture;
	}
	


}
}