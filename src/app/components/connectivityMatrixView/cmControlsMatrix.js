import {cmMatrixBase} from "./cmMatrixBase"
import {cmControlsMatrixRow} from "./rows/cmControlsMatrixRow"
import {cmEditAttributeRow} from "./rows/cmEditAttributeRow"
import {cmControlsMatrixColHeaderRow} from "./rows/cmControlsMatrixColHeaderRow"

export class cmControlsMatrix extends cmMatrixBase {

  constructor(svg, model, $log, $uibModal, scope, viewState, modalService, mainController) {
    super(svg, model, $log, $uibModal, scope, viewState, modalService, mainController);
    this.isControlsMatrix = true;
    this.setModel(model);

  }

  /**
   * Create:
   *  - cmEditAttributeRow holds button that lets user select visible attribute rows
   *  - cmControlsMatrixRow holds col attribute labels
   *  - cmControlsMatrixColHeaderRow holds attribute col labels
   */
  createRows(model) {

    let colAttributes = this.colAttributes;
    let rowAttributes = this.rowAttributes;

    // Controls row is the only one with a onColControlsClicked callback.
    let row = new cmEditAttributeRow(this.svg, this.allRows.length, [], this.numHeaderCols, this.colWidth,
      this.rowHeight, model.areColsCollapsed, this);

    this.addRow(row, this.rowHeight);

    for (var i = 0; i < this.attributes.length; ++i) {
      row = new cmControlsMatrixRow(this.svg, this.allRows.length, this.colNodeIndexes, this.numHeaderCols,
        this.colWidth, this.rowHeightAttr, false, colAttributes[i], this, i, this.attributes[i],
        this.colAttributeNodeGroup);

      this.addRow(row, this.rowHeightAttr);
    }

    let majorColLabels = model.getMajorColLabels();
    let minorColLabels = model.getMinorColLabels();
    row = new cmControlsMatrixColHeaderRow(this.svg, this.allRows.length, this.colNodeIndexes,
      this.numHeaderCols, this.colWidth, this.labelRowHeight, majorColLabels, minorColLabels, this, this.attributes,
      this.rowNodeIndexes, this.rowAttributeNodeGroup, rowAttributes, this.colAttributeNodeGroup);

    this.addRow(row, this.labelRowHeight);
  }

}
