import {cmCellVisitor} from "./cmCellVisitors";

export class cmAttributeLabelVisitor extends cmCellVisitor {
  constructor(width, height) {
    super();
    this.width = width;
    this.height = height;
  }

  apply(cell) {
    if (cell.isAttributeLabelCell) {
      let isVertical = cell.data.isVertical;
      let name = cell.data.name;
      let group = cell.getGroup()
        .append("g");

      if (isVertical) {

        group.append("text")
          .text(name)
          .attr("transform", "translate(" + this.height + " ," + this.width / 2 + ")rotate(270)")
          .classed("matrix-view-attribute-label", true)

      } else {
        group.append("text")
          .text(name)
          .attr("transform", "translate(" + this.width/2 + " ," + this.height + ")")
          .classed("matrix-view-attribute-label", true)
      }
    }
  }
}