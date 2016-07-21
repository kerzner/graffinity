import {cmAttributeCellVisitor} from "./cmAttributeCellVisitor";

export class cmStringAttributeVisitor extends cmAttributeCellVisitor {
  constructor(attributeIndex, attributeNodeGroup, labelRowWidth, labelRowHeight, labelColWidth, labelColHeight) {
    super(attributeIndex, attributeNodeGroup);
    this.labelRowHeight = labelRowHeight;
    this.labelRowWidth = labelRowWidth;
    this.labelColWidth = labelColWidth;
    this.labelColHeight = labelColHeight;
    this.isVisitingColsCollapsedAttr = false;
    this.isVisitingRowsCollapsedAttr = false;
    this.areColsCollapsed = false;
    this.areRowsCollapsed = false;
  }

  apply(cell) {
    if (this.shouldVisitCell(cell)) {
      let group = cell.getGroup();
      let text = cell.data.values[0];

      if (cell.data.isVertical) {

        if(this.areColsCollapsed && !this.isVisitingColsCollapsedAttr && cell.isMajorCell) {
          text = "----";
        }

        group.append("g")
          .attr("transform", "translate(" + this.labelRowWidth / 2 + "," + this.labelRowHeight + ")rotate(270)")
          .append("text")
          .text(text)
          .classed("matrix-view-string-attribute", true);

        this.width = this.labelRowWidth;
        this.height = this.labelRowHeight;

      } else {

        if(cell.isInMajorRow && this.areRowsCollapsed && !this.isVisitingRowsCollapsedAttr) {
          text = "----"
        }

        group.append("g")
          .append("text")
          .text(text)
          .attr("x", 0)
          .attr("y", this.labelColHeight / 2)
          .classed("matrix-view-string-attribute", true);

        this.width = this.labelColWidth;
        this.height = this.labelColHeight;

      }
      if (this.callbacks) {
        this.createInteractionGroup(cell);
      }
    }
  }
}
