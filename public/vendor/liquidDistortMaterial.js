(function(Blotter) {

  Blotter.LiquidDistortMaterial = function() {
    Blotter.Material.apply(this, arguments)
  }

  Blotter.LiquidDistortMaterial.prototype = Object.create(Blotter.Material.prototype)

  Blotter._extendWithGettersSetters(Blotter.LiquidDistortMaterial.prototype, (function () {

    function _mainImageSrc () {
      return [
        Blotter.Assets.Shaders.PI,
        Blotter.Assets.Shaders.Noise,
        "void mainImage( out vec4 mainImage, in vec2 fragCoord ) {",
        "    vec2 uv = fragCoord.xy / uResolution.xy;",
        "    float time = uGlobalTime * uSpeed;",
        "    float swell = sin((uv.x + time * 1.1) * 11.0 + uSeed) * 0.045;",
        "    swell += sin((uv.y - time * 0.9) * 8.8 + uSeedCount) * 0.026;",
        "    swell += sin((uv.x + uv.y + time * 1.35) * 6.5) * 0.018;",
        "    swell += noise(vec2(uv.x * uSeedCount + time * 1.15, uv.y * 2.0 + uSeed)) * uVolatility * 0.095;",
        "    vec2 offset = vec2(swell * uAmplitude, (swell * 0.68 + sin(time * 2.4) * 0.01) * uAmplitude);",
        "    mainImage = textTexture(uv + offset);",
        "}"
      ].join("\n")
    }

    return {
      constructor : Blotter.LiquidDistortMaterial,
      init : function () {
        this.mainImage = _mainImageSrc()
        this.uniforms = {
          uSpeed : { type : "1f", value : 0.075 },
          uVolatility : { type : "1f", value : 0.28 },
          uSeed : { type : "1f", value : 1.35 },
          uSeedCount : { type : "1f", value : 3.7 },
          uAmplitude : { type : "1f", value : 0.12 }
        }
      }
    }

  })())

})(this.Blotter)