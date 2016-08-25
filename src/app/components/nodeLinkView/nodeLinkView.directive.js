/*global d3
 */

import {LayeredLayout} from "./layouts/layeredLayout"
import {GeographicLayout} from "./layouts/geographicLayout"
import {ForceDirectedLayout} from "./layouts/forceDirectedLayout"

/**
 * Angular directive that will contain the node-link diagrams. Interaction with this is handled by the
 * NodeLinkViewDirectiveController.
 */
export class NodeLinkViewDirective {

  /**
   * Called on page load. Handles angular internal stuff.
   */
  constructor($log) {
    "ngInject";
    this.$log = $log;

    // Angular directive stuff
    this.templateUrl = "app/components/nodeLinkView/nodeLinkView.directive.html";
    this.restrict = 'E';

    // Parameters passed from main.controller.
    this.scope = {
      viewState: '=',
      mainController: '='
    };

    this.controller = NodeLinkViewDirectiveController;
    this.controllerAs = 'controller';
    this.bindToController = true;
    this.link = this.linkFn.bind(this);
  }

  /**
   * Called by angular compilation process.
   * Save this directive's element in the controller.
   */
  linkFn(scope, element) {
    scope.controller.element = element;
  }
}

/**
 * Controller for handling interaction with the node link views.
 * Mainly responsible for changing layouts.
 */
class NodeLinkViewDirectiveController {

  /**
   * Save injected dependencies and bind scope events.
   * $scope is the child of main.controller's scope.
   */
  constructor($log, $scope) {
    "ngInject"
    this.$log = $log;
    this.$scope = $scope;

    this.$scope.$on("setSelectedPaths", this.setSelectedPaths.bind(this));
    this.$scope.$on("setModel", this.setModel.bind(this));
    this.$scope.$on("hoverNodes", this.onHoverNodes.bind(this));

    this.ui = {};
    this.ui.availableLayouts = ["Layered", "Geographic", "Force-directed"];
    this.ui.selectedLayout = this.ui.availableLayouts[0];
    this.svg = d3.select("#node-link-svg");
    this.model = $scope.$parent.main.model;
  }

  /**
   * Create a new view. Called when model changes.
   */
  setModel(signal, model) {
    this.model = model;
    this.onLayoutChanged(this.ui.selectedLayout);
  }

  /**
   * User selected some paths. Draw them in the layout.
   */
  setSelectedPaths(signal, paths) {
    this.paths = paths;
    this.selectedSubgraph = this.model.getCmGraph().getSubgraph(this.paths);

    if (this.layout) {
      this.layout.clear();
      this.layout.setGraph(this.selectedSubgraph);
    } else {
      this.onLayoutChanged("Layered")
    }
  }

  /**
   * Called when node is being hovered in another view.
   * We don't connect this directly to this.layout b/c of angular memory leaks.
   */
  onHoverNodes(signal, nodes) {
    if (this.layout) {
      this.layout.onHoverNodes(signal, nodes);
    }
  }

  /**
   * Called whenever the user changes the layout.
   * Creates a new layout object.
   */
  onLayoutChanged(layout) {

    if (this.layout) {
      this.layout.clear();
    }

    // Create the layout
    if (layout == "Layered") {
      this.layout = new LayeredLayout(this.svg, this.model, this.$log, this.viewState, this.mainController);
    } else if (layout == "Geographic") {
      this.layout = new GeographicLayout(this.svg, this.model, this.$log, this.viewState, this.mainController);
    } else /* if (layout == "Force-directed") */ {
      this.layout = new ForceDirectedLayout(this.svg, this.model, this.$log, this.viewState, this.mainController);
    }

    // Give the layout data to draw.
    if (this.paths) {
      this.layout.setGraph(this.selectedSubgraph);
    }
  }
}
