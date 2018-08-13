angular.module("connectivityMatrixJs").run(["$templateCache",function(e){e.put("app/main/main.html",'<div class="full-width no-shrink top-bar"><span class="logo">Graffinity</span> <span ng-show="main.debug" ng-click="main.onSaveClicked()">Save</span> <span ng-show="main.debug" ng-click="main.onLoadClicked()">Load</span><div style="position: absolute; right: 1em; top:1em"><button type="button" ng-show="!main.areDetailsVisible && main.hasGoodData" class="btn btn-default btn-xs" ng-click="main.areDetailsVisible = true;">Show panel</button> <button type="button" ng-show="main.areDetailsVisible && main.hasGoodData" class="btn btn-default btn-xs" ng-click="main.areDetailsVisible = false;">Hide panel</button></div><div style="position: absolute; right: 6.5em; top:1em"><button type="button" ng-show="!main.isNodeListVisible && main.hasGoodData" class="btn btn-default btn-xs" ng-click="main.isNodeListVisible= true;">Show list</button> <button type="button" ng-show="main.isNodeListVisible && main.hasGoodData" class="btn btn-default btn-xs" ng-click="main.isNodeListVisible= false;">Hide list</button></div></div><div class="full-width hflex main-panel grow-1"><div class="vflex left-pane-wrappers"><div class="pane left-pane grey-border"><query-builder-regex class="query-builder" on-submit="main.onQuerySubmitted(query)" submit-disabled="main.hasActiveQuery" resource="main.resource" allow-advanced-query="main.database == \'marclab\'" dataset="main.database" main="main"></query-builder-regex></div><div class="pane left-pane grey-border" ng-show="main.hasGoodData"><h4 class="no-margin">Connectivity Matrix Controls</h4><div class="control-header">Aggregate rows<ui-select class="control-input" ng-model="main.ui.selectedCategoricalRowAttr" ng-change="main.onCollapseRowsByAttr(main.ui.selectedCategoricalRowAttr)"><ui-select-match placeholder="Categorical attribute to collapse rows">{{main.ui.selectedCategoricalRowAttr}}</ui-select-match><ui-select-choices repeat="option in main.ui.availableCategoricalAttr track by option">{{option}}</ui-select-choices></ui-select></div><div class="control-header">Aggregate cols<ui-select class="control-input" ng-model="main.ui.selectedCategoricalColAttr" ng-change="main.onCollapseColsByAttr(main.ui.selectedCategoricalColAttr)"><ui-select-match placeholder="Categorical attribute to collapse cols">{{main.ui.selectedCategoricalColAttr}}</ui-select-match><ui-select-choices repeat="option in main.ui.availableCategoricalAttr track by option">{{option}}</ui-select-choices></ui-select></div><div class="control-header">Sort order<ui-select class="control-input" ng-model="main.ui.selectedSortOrder" ng-change="main.onSortOrderChanged(main.ui.selectedSortOrder)"><ui-select-match placeholder="Selected sort order">{{main.ui.selectedSortOrder}}</ui-select-match><ui-select-choices repeat="option in main.ui.orders track by option">{{option}}</ui-select-choices></ui-select></div><div class="control-header" ng-show="main.ui.matrixMetrics">Metric<ui-select class="control-input" ng-model="main.ui.selectedMatrixMetric" ng-change="main.setMetric(\'matrix\', main.ui.selectedMatrixMetric)"><ui-select-match placeholder="Path metric">{{main.ui.selectedMatrixMetric.name}}</ui-select-match><ui-select-choices repeat="option in main.ui.matrixMetrics track by $index">{{main.ui.matrixMetrics[$index].name}}</ui-select-choices></ui-select></div><div class="control-header" ng-show="main.ui.matrixMetrics">Encoding<ui-select class="control-input" ng-model="main.ui.selectedMatrixEncoding" ng-change="main.setEncoding(\'matrix\', main.ui.selectedMatrixMetric, main.ui.selectedMatrixEncoding)"><ui-select-match placeholder="Matrix encoding">{{main.ui.selectedMatrixEncoding.name}}</ui-select-match><ui-select-choices repeat="option in main.ui.matrixEncodings track by $index">{{main.ui.matrixEncodings[$index].name}}</ui-select-choices></ui-select></div><div class="control-header" ng-show="main.ui.matrixHasScaleOption">Scale<ui-select class="control-input" ng-model="main.ui.selectedMatrixScale" ng-change="main.setEncodingScale(\'matrix\', main.ui.selectedMatrixScale)"><ui-select-match placeholder="Color scale">{{main.ui.selectedMatrixScale}}</ui-select-match><ui-select-choices repeat="option in main.ui.matrixScales track by option">{{option}}</ui-select-choices></ui-select></div><div ng-show="main.model.getIntermediateNodeIndexes().length && main.isNodeListVisible"><h4>Int. Node Table Controls</h4><div class="control-header">Aggregate rows<ui-select class="control-input" ng-model="main.ui.selectedIntermediateRowAttr" ng-change="main.onCollapseIntermediateRows(main.ui.selectedIntermediateRowAttr)"><ui-select-match placeholder="Categorical attribute to collapse rows">{{main.ui.selectedIntermediateRowAttr}}</ui-select-match><ui-select-choices repeat="option in main.ui.availableCategoricalAttr track by option">{{option}}</ui-select-choices></ui-select></div><div class="control-header" ng-show="main.ui.matrixMetrics">Metric<ui-select class="control-input" ng-model="main.ui.selectedNodeListMetric" ng-change="main.setMetric(\'nodeList\', main.ui.selectedNodeListMetric)"><ui-select-match placeholder="Path metric">{{main.ui.selectedNodeListMetric.name}}</ui-select-match><ui-select-choices repeat="option in main.ui.nodeListMetrics track by $index">{{main.ui.nodeListMetrics[$index].name}}</ui-select-choices></ui-select></div><div class="control-header" ng-show="main.ui.matrixMetrics">Encoding<ui-select class="control-input" ng-model="main.ui.selectedNodeListEncoding" ng-change="main.setEncoding(\'nodeList\', main.ui.selectedNodeListMetric, main.ui.selectedNodeListEncoding)"><ui-select-match placeholder="Matrix encoding">{{main.ui.selectedNodeListEncoding.name}}</ui-select-match><ui-select-choices repeat="option in main.ui.matrixEncodings track by $index">{{main.ui.nodeListEncodings[$index].name}}</ui-select-choices></ui-select></div><div class="control-header" ng-show="main.ui.nodeListHasScaleOption">Scale<ui-select class="control-input" ng-model="main.ui.selectedNodeListScale" ng-change="main.setEncodingScale(\'nodeList\', main.ui.selectedNodeListScale)"><ui-select-match placeholder="Color scale">{{main.ui.selectedNodeListScale}}</ui-select-match><ui-select-choices repeat="option in main.ui.matrixScales track by option">{{option}}</ui-select-choices></ui-select></div></div><div class="control-header" ng-show="main.ui.hasLegend"><b>Legend</b><svg id="encoding-legend"></svg></div></div></div><div ng-show="main.hasGoodData" class="pane center-pane grow-1 vflex"><h4 class="no-margin">Connectivity Matrix</h4><div id="matrices-row" class="grow-1 vflex"></div></div><div ng-show="main.hasGoodData && main.model.getIntermediateNodeIndexes().length && main.isNodeListVisible" class="pane pane-center-right vflex intermediate-nodes"><div ng-show="main.model.getIntermediateNodeIndexes().length" class="vflex grow-1"><h4 class="no-margin">Int. Node Table</h4><div id="node-list-col" class="grow-1 vflex"></div></div></div><div ng-show="!main.model.getIntermediateNodeIndexes().length || !main.isNodeListVisible" class="pane pane-center-right"></div><div ng-show="!main.hasGoodData" class="pane center-pane loading-pane grow-1 hflex vflex"><h3 ng-show="main.hasActiveQuery">Query is loading...</h3><div ng-show="main.hasActiveQuery"><i class="fa fa-spinner fa-spin" style="font-size:48px"></i></div><h3 ng-show="main.hasQueryError">Something went wrong...</h3><h4 ng-show="main.hasQueryError">{{main.queryError}}</h4></div><div ng-show="main.areDetailsVisible && main.hasGoodData" class="pane right-pane grey-border vflex"><uib-tabset active="1" type="tabs" class="grow-1 vflex" style="display: inline-flex !important;"><uib-tab index="0" heading="{{main.availablePanels[0]}}"><div class="grow-1 vflex"><node-link-view-directive view-state="main.viewState" main-controller="main" class="vflex grow-1"></node-link-view-directive></div></uib-tab><uib-tab index="1" heading="{{main.availablePanels[1]}}"><div path-list-view-directive="" view-state="main.viewState" main-controller="main" class="vflex grow-1"></div></uib-tab></uib-tabset></div></div>'),e.put("app/components/adjustableColorScale/adjustableColorScale.directive.html",'<div><b>{{controller.metric}}</b> <span class="matrix-view-edit-attribute-controls"></span></div><span class="legend-container"></span>'),e.put("app/components/dataSelection/dataSelection.html",'<script type="text/ng-template" id="app/components/dataSelection/dataSelection.html"><div class="modal-header"> <h4 class="inline modal-title">Select dataset</h4> </div> <div class="modal-body"> <!-- Ask the user to upload data --> <div style="border-bottom: 1px solid #e5e5e5; padding-bottom: 10px"> <span class="modal-line-header">Load data:</span> <input class="btn btn-default btn-xs" readonly=true type="text" ng-model="controller.filename"> <label class="btn btn-xs btn-default btn-file"> Select file <input style="display:none;" type="file" accept=".json" ng-model="controller.filename" onchange="angular.element(this).scope().controller.onFileChanged(this)"> </label> <div class="float-right"> <span ng-show="controller.isUserDataOk"> Network parsed! Nodes: {{controller.userData.nodes.length}} Edges: {{controller.userData.edges.length}}</span> <span ng-show="controller.userDataError" class="red-text"> Could not find nodes and edges in {{controller.filename}} </span> <button ng-disabled="!controller.isUserDataOk" class="btn btn-xs btn-primary" type="button" ng-click="controller.go(controller.userData)">Go! </button> </div> </div> <!-- Display list of preloaded datasets. --> <div style="padding-top: 10px" ng-repeat="dataName in controller.defaultDataName"> <span class="modal-line-header">Preset data: </span> {{dataName}} <div class="float-right"> Nodes: {{controller.defaultData[$index].nodes.length}} Edges: {{controller.defaultData[$index].edges.length}} <button class="btn btn-xs btn-primary" type="button" ng-click="controller.go(controller.defaultData[$index])">Go! </button> </div> </div> </div> <div class="modal-footer"> <button class="btn btn-xs btn-primary btn-warning" type="button">Help!</button> </div></script>'),e.put("app/components/modals/modalHistogramFilter.html",'<div class="modal-header"><h3 class="modal-title">{{modalController.title}}</h3></div><div class="modal-body"><div ng-show="modalController.errorMessage">{{modalController.errorMessage}}</div><div>Number of bins: <input type="number" style="width: 4em;" ng-model="modalController.numBins" ng-change="modalController.histogram.setNumBins(modalController.numBins)"></div><div></div><svg></svg></div><div class="modal-footer"><button class="btn btn-primary" type="button" ng-click="modalController.ok()">OK</button> <button class="btn btn-warning" type="button" ng-click="modalController.cancel()">Cancel</button></div>'),e.put("app/components/modals/modalListFilter.html",'<div class="modal-header"><h3 class="modal-title">{{modalController.title}}</h3></div><div class="modal-body"><div ng-repeat="item in modalController.items"><input type="checkbox" ng-model="modalController.isItemSelected[item]">{{item}}</div></div><div class="modal-footer"><button class="btn btn-primary" type="button" ng-click="modalController.ok()">OK</button> <button class="btn btn-warning" type="button" ng-click="modalController.cancel()">Cancel</button></div>'),e.put("app/components/nodeLinkView/nodeLinkView.directive.html",'<h4>Node Link</h4><div ng-show="controller.paths" class="grow-1 vflex"><div class="control-header">Layout<ui-select ng-model="controller.ui.selectedLayout" ng-change="controller.onLayoutChanged(controller.ui.selectedLayout)" class="control-input"><ui-select-match placeholder="layout">{{controller.ui.selectedLayout}}</ui-select-match><ui-select-choices repeat="option in controller.ui.availableLayouts track by option">{{option}}</ui-select-choices></ui-select></div><br><div class="node-link-view-container grow-1" id="node-link-column"><svg id="node-link-svg"></svg></div></div><div ng-show="!controller.paths">Select some paths to see a node-link view.</div>'),e.put("app/components/numPaths/numPaths.directive.html",'<div><b>Query statistics</b></div><div style="display: inline-block"><div class="numPathsLabel">Length</div><div class="numPathsLabel">Paths</div></div><div style="display:inline-block"><div class="numPaths" style="display: inline-block" ng-repeat="(key, value) in numPathsController.paths"><div>{{key}}</div><div ng-show="numPathsController.numVisiblePathsPerHops != null" class="label label-primary numPathsValue">{{numPathsController.numVisiblePathsPerHops[key]}} ({{(numPathsController.numVisiblePathsPerHops[key] / value.length * 100).toFixed(1)}}%)</div><div ng-show="numPathsController.numVisiblePathsPerHops == null" class="label label-primary numPathsValue">{{value.length}}</div></div></div>'),e.put("app/components/pathListView/pathListView.directive.html",'<h4>Path List</h4><div class="vflex grow-1 vertical-scroll" ng-if="controller.pathListModel.rows.length > 0"><table style="width:100%"><thead><tr class="path-list-header-row"><th></th><th>Paths</th><th class="path-list-attribute-col" ng-click="controller.orderByField=\'paths[0].length\'; controller.descending=!controller.descending">Len</th><th class="path-list-attribute-col" ng-click="controller.orderByField=\'paths.length\'; controller.descending=!controller.descending">Freq</th></tr></thead><tbody class="path-list-path-body" ng-repeat="row in controller.pathListModel.rows | orderBy:controller.orderByField:controller.descending"><tr class="path-list-spacer"></tr><tr><td class="path-list-small-cell"><span class="matrix-view-edit-attribute-controls"><i class="fa fa-angle-right" ng-show="!row.isExpanded" ng-click="row.isExpanded=!row.isExpanded;"></i> <i class="fa fa-angle-down" ng-show="row.isExpanded" ng-click="row.isExpanded=!row.isExpanded;"></i></span></td><td><span class="path-list-path"><span ng-repeat="i in row.paths[0] track by $index" class="path-list-path"><span ng-if="$index%2==0" class="path-list-node" ng-class="{\'path-list-hovered\' : controller.hoveredNodes.indexOf(row.paths[0][$index]) != -1}" ng-mouseover="controller.hoverNodes([row.paths[0][$index]])" ng-mouseleave="controller.hoverNodes()">{{controller.model.getMajorLabels([row.paths[0][$index]])[0]}}<br>{{controller.mainController.isMarclabData ? controller.model.getNodeAttr([row.paths[0][$index]], "label")[0] : ""}}</span> <span ng-show="$index%2==1" class="path-list-edge"></span></span></span></td><td class="path-list-attribute-col">{{(row.paths[0].length + 1) / 2}}</td><td class="path-list-attribute-col">{{row.paths.length}}</td></tr><tr ng-show="row.isExpanded"><td colspan="1"></td><td colspan="4"><table style="width: 100%;"><thead><tr><td class="path-list-small-cell"></td><td ng-repeat="i in row.paths[0] track by $index" ng-if="$index %2 == 1"><span class="path-list-child-edge"><b>Edge {{($index + 1) / 2}}</b></span></td></tr></thead><tbody ng-repeat="path in row.paths track by $index"><tr><td ng-click="row.isPathExpanded[$index]=!row.isPathExpanded[$index];" class="path-list-small-cell"><span class="matrix-view-edit-attribute-controls"><i class="fa fa-angle-right" ng-show="!row.isPathExpanded[$index]"></i> <i class="fa fa-angle-down" ng-show="row.isPathExpanded[$index]"></i></span></td><td ng-repeat="i in path track by $index" ng-if="$index %2 == 1"><span class="path-list-child-edge" ng-bind-html="controller.pathListModel.getEdgeDescription(path[$index])"></span></td></tr><tr ng-show="row.isPathExpanded[$index]"><td></td><td ng-repeat="i in path track by $index" ng-if="$index %2 == 1"><span class="path-list-child-edge" ng-bind-html="controller.pathListModel.getEdgeDetails(path[$index])"></span></td></tr></tbody></table></td></tr></tbody></table></div><div ng-if="!controller.paths">Select some paths to see a list!</div>'),e.put("app/components/queryBuilder/queryBuilder.directive.html",'<h4 class="inline">{{queryController.isMarclabData ? "Connectome" : "Flight"}} Query</h4><div><div class="input-group query-builder-item query-builder-input"><span class="input-group-addon query-builder-addon">{{!queryController.isMarclabData ? "Max len" : "Len"}}</span><ui-select theme="bootstrap" ng-model="queryController.ui.selectedNumHops" ng-change="queryController.setNumHops(queryController.ui.selectedNumHops)" ng-disabled="queryController.isCypherWritable"><ui-select-match>{{queryController.ui.selectedNumHops}}</ui-select-match><ui-select-choices repeat="option in queryController.ui.availableNumHops">{{option}}</ui-select-choices></ui-select></div><div ng-repeat="key in queryController.ui.keys track by $index" style="width: 100%"><div class="input-group query-builder-item query-builder-input" ng-if="($index == 0 || $index == queryController.ui.keys.length-1) && !queryController.isMarclabData || queryController.isMarclabData"><span class="input-group-addon query-builder-addon">{{key}}</span><tags-input ng-model="queryController.ui.nodes[$index]" placeholder="{{queryController.placeholder}}" replace-spaces-with-dashes="false" ng-disabled="queryController.isCypherWritable" on-tag-added="queryController.onQueryModified()" on-tag-removed="queryController.onQueryModified()" add-from-autocomplete-only="true"><auto-complete min-length="1" source="queryController.loadNodeSuggestions($query)" display-property="text"></auto-complete></tags-input></div><div ng-if="key == \'Node\' && !queryController.isMarclabData && queryController.hasIntermediateNodeFilters()">Middle Nodes</div><div style="padding-left: 4.5em"><div ng-repeat="filter in queryController.filters[key]"><span ng-if="filter" class="query-builder-filter"><i class="fa fa-filter matrix-view-toolbar-item" title="edit filter" ng-click="queryController.main.openNodeAttributeFilter(filter.attribute, null, filter.attributeNodeGroup)"></i> <span ng-if="filter.isQuantitative">{{filter.attribute}} in [{{ filter.filter[0] | number:2 }} , {{ filter.filter[1] | number:2 }}]</span> <span ng-if="!filter.isQuantitative"><span ng-if="filter.filterTexts.length < 3">{{filter.attribute}} not in [<span ng-repeat="item in filter.filterTexts">{{item}}</span>]</span> <span ng-if="filter.filterTexts.length >= 3">Filtering {{filter.filterTexts.length}} {{filter.attribute}}s</span></span> <i class="fa fa-close matrix-view-toolbar-item" ng-click="queryController.main.resetAttributeFilter(filter.attribute, filter.attributeNodeGroup)" title="remove filter"></i></span></div></div><div class="input-group query-builder-item query-builder-input" ng-show="$index < queryController.ui.keys.length - 1 && queryController.isMarclabData"><span class="input-group-addon query-builder-addon">Edge</span><tags-input placeholder="{{queryController.placeholder}}" ng-model="queryController.ui.edges[$index]" replace-spaces-with-dashes="false" ng-disabled="queryController.isCypherWritable" on-tag-added="queryController.onQueryModified()" on-tag-removed="queryController.onQueryModified()" add-from-autocomplete-only="true"><auto-complete min-length="1" source="queryController.loadEdgeSuggestions($query)" display-property="text"></auto-complete></tags-input></div></div></div><div ng-show="queryController.isCypherVisible"><textarea class="query-builder-text-area" placeholder="Write a query that returns path(s) p" ng-model="queryController.cypher" ng-disabled="!queryController.isCypherWritable" ng-change="queryController.onQueryModified()">\r\n  </textarea></div><div class="input-group query-builder-item query-builder-input"><tr><td><button type="button" class="btn btn-default btn-xs" ng-click="queryController.isCypherVisible =! queryController.isCypherVisible;" ng-disabled="queryController.isCypherWritable">{{ !queryController.isCypherVisible ? "Show cypher" : "Hide cypher" }}</button> <button type="button" class="btn btn-default btn-xs" ng-click="queryController.isCypherWritable =! queryController.isCypherWritable;" ng-show="queryController.isCypherVisible && !queryController.isCypherWritable"><i class="fa fa-pencil" title="edit cypher"></i></button> <button type="button" class="btn btn-default btn-xs" ng-click="queryController.isCypherWritable =! queryController.isCypherWritable;" ng-show="queryController.isCypherVisible && queryController.isCypherWritable"><i class="fa fa-undo" style="transform:rotate(270deg)" title="reset cypher"></i></button></td><td><button type="button" class="btn btn-default btn-xs query-builder-submit-btn" ng-click="queryController.onSubmitClicked()">Submit</button></td></tr></div>'),e.put("app/components/query/query.directive.html",'<textarea class="query-text-area" type="text" placeholder="Write a query that returns path(s) p" ng-model="queryController.cypherQuery">\r\n</textarea> <button ng-click="queryController.submit({query:queryController.cypherQuery})" class="btn btn-default query-button" ng-disabled="queryController.submitDisabled">Submit</button>'),e.put("app/components/queryBuilderRegex/queryBuilderRegex.directive.html",'<h4 class="inline">Connectome Query</h4><div><div class="input-group query-builder-item query-builder-input"><span class="input-group-addon query-builder-addon">Len</span><ui-select theme="bootstrap" ng-model="queryController.ui.selectedNumHops" ng-change="queryController.setNumHops(queryController.ui.selectedNumHops)" ng-disabled="queryController.isCypherWritable"><ui-select-match>{{queryController.ui.selectedNumHops}}</ui-select-match><ui-select-choices repeat="option in queryController.ui.availableNumHops">{{option}}</ui-select-choices></ui-select></div><div ng-repeat="node in queryController.ui.nodes track by $index" style="width: 100%"><div class="input-group query-builder-item query-builder-input"><span class="input-group-addon query-builder-addon">{{node}}</span> <input type="text" class="form-control" ng-model="queryController.ui.nodes[$index]"></div><div ng-if="$index < queryController.ui.nodes.length-1" class="input-group query-builder-item query-builder-input"><span class="input-group-addon query-builder-addon">{{queryController.ui.edges[$index]}}</span> <input type="text" class="form-control" ng-model="queryController.ui.edges[$index]"></div></div></div><div class="input-group query-builder-item query-builder-input"><button type="button" class="btn btn-default btn-xs query-builder-submit-btn" ng-click="queryController.onSubmitClicked()">Submit</button></div>')}]);
//# sourceMappingURL=../maps/scripts/app-2acda265a2.js.map