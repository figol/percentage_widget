/*
##############################################################################
#
#    percentage widget for openerp 7.0
#    Copyright 2014 figol <figolliu@gmail.com>
#
#    This program is free software: you can redistribute it and/or modify
#    it under the terms of the GNU Affero General Public License as
#    published by the Free Software Foundation, either version 3 of the
#    License, or (at your option) any later version.
#
#    This program is distributed in the hope that it will be useful,
#    but WITHOUT ANY WARRANTY; without even the implied warranty of
#    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
#    GNU Affero General Public License for more details.
#
#    You should have received a copy of the GNU Affero General Public License
#    along with this program.  If not, see <http://www.gnu.org/licenses/>.
#
##############################################################################
*/
openerp.web_percentage_widget = function(instance) {
    var _t = instance.web._t,
        _lt = instance.web._lt;
    var QWeb = instance.web.qweb;

    // form view
    instance.web.form.widgets.add('percentage', 'instance.web_percentage_widget.PercentageWidget');
    instance.web_percentage_widget.PercentageWidget = instance.web.form.FieldFloat.extend({
        display_name: _lt('PercentageWidget'),
        template: "PercentageWidget",
        render_value: function() {
            if (!this.get("effective_readonly")) {
                this._super();
            } else {
                var _value = parseFloat(this.get('value'));
                if (isNaN(_value)) {
                    this.$el.find(".percentage_filed").text();
                }
                else{
                    this.$el.find(".percentage_filed").text((_value*100).toFixed(2) + '%');
                }
            }
        }
    });

    // list view
    instance.web.list.columns.add('field.percentage', 'instance.web.list.Percentage');
    instance.web.list.Percentage = instance.web.list.Column.extend({
        /**
         * Return a percentage format value
         *
         * @private
         */
        _format: function (row_data, options) {
            var _value = parseFloat(row_data[this.id].value);
            if (isNaN(_value)) {
                return null;
            }
            return (_value*100).toFixed(2) + '%';
        }
    });
};
