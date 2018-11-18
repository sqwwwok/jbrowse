define([
    'dojo/_base/declare',
    'dojo/_base/array',
    'dojo/_base/lang',
    'JBrowse/View/FeatureGlyph/Alignment',
    'JBrowse/View/FeatureGlyph/AlignmentColoring'
],
function(
    declare,
    array,
    lang,
    FeatureGlyph,
    AlignmentColoring
) {
    return declare(FeatureGlyph, {

        _defaultConfig: function() {
            return this._mergeConfigs(lang.clone(this.inherited(arguments)), {
                style: {
                    color: AlignmentColoring.colorArcs,
                    mouseovercolor: 'rgba(0,0,0,0)',
                    strandArrow: false,
                    orientationType: 'fr' // default illumina adapter sequence --> <--
                }
            });
        },

        renderFeature: function(context, fRect) {
            var r = this.getRadius(fRect.f, fRect.viewInfo.block);
            if (!r.r) {
                return
            }

            context.beginPath()
            context.strokeStyle = this.getConf('style.color', [fRect.f, r.span, this, this.track])

            if (fRect.f.get('seq_id') !== fRect.f.get('next_seq_id')) {
                if (this.track.config.showInterchromosomalArcs) {
                    context.moveTo(r.drawFrom, 0)
                    context.lineTo(r.drawFrom, 1000)
                }
            } else {
                if(Math.abs(r.drawTo+r.r)>100000) {
                    context.moveTo(r.drawTo, 0)
                    context.lineTo(r.drawTo, 1000)
                } else {
                    context.arc(r.drawTo + r.r, 0, Math.abs(r.r), 0, Math.PI)
                }
            }
            context.stroke();
        },
        getRadius: function(feature, block) {
            var n = feature.get('end') - feature.get('start')
            var chr = feature.get('seq_id')
            if (!n) {
                return {};
            }

            var s = feature.get('start')
            var e = feature.get('end')
            var drawTo = block.bpToX(e)
            var drawFrom = block.bpToX(s)
            return {
                r: (drawFrom - drawTo) / 2,
                drawTo: drawTo,
                drawFrom: drawFrom,
                span: Math.abs(s - e)
            };
        }
    });
});

