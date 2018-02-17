import {cmNodeListBase} from "./cmNodeListBase"
import {cmDataRow} from "../cmDataRow"
import {cmMatrixRow} from "../rows/cmMatrixRow"

export class cmNodeListView extends cmNodeListBase {

  constructor(svg, model, $log, $uibModal, scope, viewState, modalService, mainController) {
    super(svg, model, $log, $uibModal, scope, viewState, modalService, mainController);

    this.colWidthAttr = 0;
    this.colWidthLabel = 0;
    this.colWidthControl = 0;
    this.rowHeightAttr = 0;

    this.hasEncodings = true;

    this.colorScaleIndexSets = 2;
    this.colorScaleIndexNodes = 3;

    this.setModel(model);
  }

  /**
   * Creates cmMatrixRow (empty), cmDataRow
   */
  createRows(model) {
    for (var i = 0; i < this.numHeaderCols; ++i) {
      this.addRow(new cmMatrixRow(this.svg, i, this.colNodeIndexes, this.numHeaderCols), 0);
    }

    // Create each of the data rows!
    let modelRows = model.getCurrentIntermediateNodeRows();
    let majorRowLabels = model.getMajorLabels(model.getCurrentIntermediateNodeIndexes(), model.intermediateNodeCollapseAttr);
    let minorRowLabels = model.getMinorLabels(model.getCurrentIntermediateNodeIndexes());
    let rowNodeAttributes = this.rowNodeAttributes;

    for (i = 0; i < this.rowNodeIndexes.length; ++i) {
      let dataRow = new cmDataRow(this.svg, i + this.numHeaderRows, this.colNodeIndexes, this.numHeaderCols, this.colWidth,
        this.rowHeight, false, modelRows[i], majorRowLabels[i], minorRowLabels[i], rowNodeAttributes[i], this, false, model.areIntermediateNodesCollapsed, true);

      // If row has minor rows, then we want the controls to be visible!
      if (model.areIntermediateNodesCollapsed) {
        let callback = this.onRowControlsClicked.bind(this);
        dataRow.createControlsCell(this.colWidth, this.rowHeight, callback);
      }

      this.colWidthLabel = 0;
      dataRow.setLabelColWidth(this.colWidthLabel);
      this.addRow(dataRow, this.rowHeight);

    }
  }

}
