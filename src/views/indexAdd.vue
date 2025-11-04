<template>
  <div class="dashboard-editor-container">
    <!--服务列表 -->
    <el-main v-show="showServiceList">
      <el-table
        :data="serviceList"
        header-row-class-name="header-text-center"
        row-class-name="cell-text-center"
      >
        <el-table-column prop="flowInfo" label="流程信息"> </el-table-column>
        <el-table-column prop="relaId" label="关联id"> </el-table-column>
        <el-table-column prop="relaId" label="预览">
          <template #default="scope">
            <el-button
              type="text"
              size="mini"
              @click="SearchFlowByRelaId(scope.row.relaId)"
              >预览</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-main>
    <!-- 主界面 -->
    <div class="dashboard" v-show="!showServiceList">
      <!-- 左边 -->
      <div class="dashboard-left">
        <el-button
          class="button-abs"
          type="primary"
          plain
          icon="DocumentAdd"
          @click="saveSetting"
          >保存配置</el-button
        >
        <div
          id="dropArea"
          @drop="drop($event)"
          @dragover.prevent
          :style="{ height: showInfoSelectNode != '' ? '70%' : '100%' }"
        >
          <div class="container">
            <div class="flow-container">
              <div class="flow-wrapper">
                <vue-flow
                  v-model:nodes="nodes"
                  v-model:edges="edges"
                  @connect="onConnect"
                  @edge-click="onEdgeClick"
                  :fit-view-on-init="true"
                  :nodes-draggable="true"
                  :nodes-connectable="true"
                  :zoom-on-scroll="false"
                  @node-click="searchElementId($event)"
                >
                  <template #node-custom="{ data }">
                    <Handle type="target" position="top" />
                    <div :class="['custom-node', data.type]">
                      {{ data.label }}
                    </div>
                    <Handle type="source" position="bottom" />
                  </template>
                  <svg width="0" height="0">
                    <defs>
                      <marker
                        id="arrowhead"
                        viewBox="0 0 10 10"
                        refX="5"
                        refY="5"
                        markerWidth="6"
                        markerHeight="6"
                        orient="auto"
                      >
                        <path d="M 0 0 L 10 5 L 0 10 z" fill="#3498db" />
                      </marker>
                    </defs>
                  </svg>
                  <svg width="0" height="0">
                    <defs>
                      <marker
                        id="arrowheadRed"
                        viewBox="0 0 10 10"
                        refX="5"
                        refY="5"
                        markerWidth="6"
                        markerHeight="6"
                        orient="auto"
                      >
                        <path d="M 0 0 L 10 5 L 0 10 z" fill="#e74c3c" />
                      </marker>
                    </defs>
                  </svg>
                  <Background />
                  <MiniMap />
                </vue-flow>
              </div>
            </div>
          </div>
        </div>
        <van-tabs
          background="rgba(173, 216, 230, 0.5)"
          v-model="tab"
          color="#65b8ff"
          title-active-color="#65b8ff"
          v-if="showInfoSelectNode == 'IDSimpleTask'"
        >
          <van-tab class="nodo-info" title="节点信息">
            <div class="info">{{ nodeInfo[0].nodeDesc }}</div>
          </van-tab>
          <van-tab class="nodo-info" title="输入">
            <div class="nodo-info-input">
              <van-field v-model="nodeInfo[0].name" label="客户名称" />
              <van-field v-model="nodeInfo[0].password" label="登录密码" />
            </div>
          </van-tab>
        </van-tabs>
        <van-tabs
          background="rgba(173, 216, 230, 0.5)"
          v-model="tab"
          color="#65b8ff"
          title-active-color="#65b8ff"
          v-if="showInfoSelectNode == 'IDThrowException'"
        >
          <van-tab class="nodo-info" title="节点信息">
            <div class="info">{{ nodeInfo[1].nodeDesc }}</div>
          </van-tab>
          <van-tab class="nodo-info" title="输入">
            <div class="nodo-info-input">
              <van-field v-model="nodeInfo[1].name" label="客户名称" />
              <van-field v-model="nodeInfo[1].password" label="登录密码" />
            </div>
          </van-tab>
        </van-tabs>
        <van-tabs
          background="rgba(173, 216, 230, 0.5)"
          v-model="tab"
          color="#65b8ff"
          title-active-color="#65b8ff"
          v-if="showInfoSelectNode == 'IDInsertData'"
        >
          <van-tab class="nodo-info" title="节点信息">
            <div class="info">{{ nodeInfo[2].nodeDesc }}</div>
          </van-tab>
          <van-tab class="nodo-info" title="输入">
            <div class="nodo-info-input">
              <van-field v-model="nodeInfo[2].name" label="客户名称" />
              <van-field v-model="nodeInfo[2].password" label="登录密码" />
            </div>
          </van-tab>
        </van-tabs>
        <van-tabs
          background="rgba(173, 216, 230, 0.5)"
          v-model="tab"
          color="#65b8ff"
          title-active-color="#65b8ff"
          v-if="showInfoSelectNode == 'IDUpdateData'"
        >
          <van-tab class="nodo-info" title="节点信息">
            <div class="info">{{ nodeInfo[3].nodeDesc }}</div>
          </van-tab>
          <van-tab class="nodo-info" title="输入">
            <div class="nodo-info-input">
              <van-field v-model="nodeInfo[3].name" label="客户名称" />
              <van-field v-model="nodeInfo[3].password" label="登录密码" />
            </div>
          </van-tab>
        </van-tabs>
        <van-tabs
          background="rgba(173, 216, 230, 0.5)"
          v-model="tab"
          color="#65b8ff"
          title-active-color="#65b8ff"
          v-if="showInfoSelectNode == 'IDWealthService'"
        >
          <van-tab class="nodo-info" title="节点信息">
            <div class="info">{{ nodeInfo[4].nodeDesc }}</div>
          </van-tab>
          <van-tab class="nodo-info" title="输入">
            <div class="nodo-info-input">
              <van-field v-model="nodeInfo[4].name" label="客户名称" />
              <van-field v-model="nodeInfo[4].password" label="登录密码" />
            </div>
          </van-tab>
        </van-tabs>
        <van-tabs
          background="rgba(173, 216, 230, 0.5)"
          v-model="tab"
          color="#65b8ff"
          title-active-color="#65b8ff"
          v-if="showInfoSelectNode == 'IDFundService'"
        >
          <van-tab class="nodo-info" title="节点信息">
            <div class="info">{{ nodeInfo[5].nodeDesc }}</div>
          </van-tab>
          <van-tab class="nodo-info" title="输入">
            <div class="nodo-info-input">
              <van-field v-model="nodeInfo[5].name" label="客户名称" />
              <van-field v-model="nodeInfo[5].name" label="登录密码" />
            </div>
          </van-tab>
        </van-tabs>
      </div>
      <!-- 右边 -->
      <div class="dashboard-right" v-if="showManagerRightDialog">
        <div class="palette">
          <img :src="palette" alt="" />
          <div>面板</div>
        </div>
        <div class="mouse">
          <img :src="arrow" alt="" />
          <img :src="connect" alt="" />
        </div>
        <!-- 父组件名称 -->
        <div v-for="(item, index) in componentfather" :key="index">
          <div class="fatherNme" @click="clickFather(`window${index}`)">
            <div class="fatherNme-flex">
              <img :src="file" alt="" />
              <div>{{ item.fatherNme }}</div>
            </div>
          </div>
          <!-- 子组件 -->
          <div v-show="windowIndex[`window${index}`]">
            <div
              v-for="(itemChild, indexChild) in item.componentChild"
              :key="indexChild"
              class="childName"
              :id="itemChild.elementId"
              :draggable="true"
              @dragstart="dragstart(itemChild, itemChild.elementId, $event)"
            >
              <img :src="tool" alt="" />
              <div>{{ itemChild.childName }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  add,
  del,
  update,
  searchFlowService,
  SearchFlowByRelaId,
} from "@/api/test.js";
import palette from "@/assets/endUI/palette.svg";
import arrow from "@/assets/endUI/arrow.svg";
import connect from "@/assets/endUI/connect.svg";
import file from "@/assets/endUI/file.svg";
import tool from "@/assets/endUI/tool.svg";
import { ref } from "vue";
import { VueFlow } from "@vue-flow/core";
import { Background, MiniMap } from "@vue-flow/additional-components";
import "@vue-flow/core/dist/style.css";
import "@vue-flow/core/dist/theme-default.css";
import { Handle } from "@vue-flow/core"; // 需要引入 Handle
// 添加全局键盘事件监听
export default {
  name: "Index",
  components: {
    VueFlow,
    Handle,
    Background,
    MiniMap,
  },
  data() {
    return {
      palette,
      arrow,
      connect,
      file,
      tool,
      componentfather: [
        {
          fatherNme: "Shapes",
          componentChild: [
            { childName: "简单任务", elementId: "IDSimpleTask" },
            { childName: "抛异常", elementId: "IDThrowException" },
          ],
        },
        {
          fatherNme: "数据库组件",
          componentChild: [
            { childName: "插入数据", elementId: "IDInsertData" },
            { childName: "修改数据", elementId: "IDUpdateData" },
          ],
        },
        {
          fatherNme: "通讯组件",
          componentChild: [
            { childName: "理财服务", elementId: "IDWealthService" },
            { childName: "基金服务", elementId: "IDFundService" },
          ],
        },
      ],
      componentList: [], // 组件列表
      showManagerDialog: false,
      showManagerRightDialog: true, //组件属性右侧
      windowIndex: {
        window0: true,
        window1: true,
        window2: true,
      },
      dragElement: "",
      tab: 1,
      nodes: ref([
        // {
        //   id: "1",
        //   type: "custom",
        //   position: { x: 100, y: 100 },
        //   data: { label: "开始", type: "process" },
        // },
        // {
        //   id: "2",
        //   type: "custom",
        //   position: { x: 400, y: 100 },
        //   data: { label: "处理数据", type: "process" },
        // },
      ]),
      edges: ref([
        // {
        //   id: "e1-2",
        //   source: "1",
        //   target: "2",
        // },
      ]),
      lastConnection: ref(null),
      showInfoSelectNode: "",

      nodeInfo: [
        {
          id: "IDSimpleTask",
          name: "简单任务",
          password: "123456简单任务",
          nodeDesc: "简单任务节点信息",
        },
        {
          id: "IDThrowException",
          name: "抛异常",
          password: "123456抛异常",
          nodeDesc: "抛异常节点信息",
        },
        {
          id: "IDInsertData",
          name: "插入数据",
          password: "123456插入数据",
          nodeDesc: "插入数据节点信息",
        },
        {
          id: "IDUpdateData",
          name: "修改数据",
          password: "123456修改数据",
          nodeDesc: "修改数据节点信息",
        },
        {
          id: "IDWealthService",
          name: "理财服务",
          password: "123456理财服务",
          nodeDesc: "理财服务节点信息",
        },
        {
          id: "IDFundService",
          name: "基金服务",
          password: "123456基金服务",
          nodeDesc: "基金服务节点信息",
        },
        {
          id: "1",
          name: "1服务",
          password: "1234561服务",
          nodeDesc: "1服务节点信息",
        },
        {
          id: "2",
          name: "2服务",
          password: "1234562服务",
          nodeDesc: "2服务节点信息",
        },
      ],
      serviceList: [], //查询服务列表
      showServiceList: false,
    };
  },
  mounted() {
    this.searchFlowService();
  },
  methods: {
    saveSetting() {
      console.log("node", this.nodes);
      console.log("edgenode", this.edges);
      let nodeArray = [];
      let uniqueNodeArrayInput = [];
      let nodeSelfInfoInput = [];
      let edgeArray = [];

      this.edges.forEach((element) => {
        let edgeTmp = {};
        edgeTmp.id = element.id;
        edgeTmp.source = element.source;
        edgeTmp.target = element.target;
        // 1.流程信息 edgeArray
        edgeArray.push(JSON.stringify(edgeTmp)); //['{"id":"e1-2","source":"1","target":"2"}']
        //2.节点数据
        nodeArray.push(element.source);
        nodeArray.push(element.target);
      });
      let edgeArrayInput = edgeArray.join("&");
      console.log("edgeArrayInput", edgeArray);
      //2.节点数据信息 uniqueNodeArrayInput
      if (nodeArray.length > 0) {
        // 对流程节点去重
        let uniqueNodeArray = this.removeDuplicates(nodeArray);
        // 获取节点数据信息
        uniqueNodeArray.forEach((element) => {
          let nodeInfoTmp = this.nodeInfo.find((item) => item.id === element);
          if (nodeInfoTmp != undefined) {
            uniqueNodeArrayInput.push(JSON.stringify(nodeInfoTmp));
          }
        });

        // {
        //   id: "2",
        //   type: "custom",
        //   position: { x: 400, y: 100 },
        //   data: { label: "处理数据", type: "process" },
        // },
        //获取节点本身信息
        uniqueNodeArray.forEach((element) => {
          let nodeSelfInfo = this.nodes.find((item) => item.id === element);
          if (nodeSelfInfo != undefined) {
            let nodeSelfInfoTmp = {};
            nodeSelfInfoTmp.id = nodeSelfInfo.id;
            nodeSelfInfoTmp.type = nodeSelfInfo.type;
            nodeSelfInfoTmp.position = nodeSelfInfo.position;
            nodeSelfInfoTmp.data = nodeSelfInfo.data;
            console.log("nodeSelfInfoTmp", nodeSelfInfoTmp);
            nodeSelfInfoInput.push(JSON.stringify(nodeSelfInfoTmp));
          }
        });
      }
      console.log("nodeSelfInfoInput", nodeSelfInfoInput);
      console.log("uniqueNodeArrayInput", uniqueNodeArrayInput);
      // 输入信息 1.流程信息 edgeArray 2.节点数据信息 uniqueNodeArrayInput 3. 节点信息
      this.addFunc(edgeArrayInput, uniqueNodeArrayInput, nodeSelfInfoInput);
    },
    removeDuplicates(array) {
      return [...new Set(array)];
    },
    // 获取点击元素的id
    searchElementId(event) {
      this.showInfoSelectNode = event.node.id;
      this.tab = 1; //展示节点信息
      console.log("Clicked element ID:", event.node.id, this.tab);
    },

    onConnect(params) {
      console.log("params", params);
      // 创建新的连接
      const newEdge = {
        id: `${params.source}-${params.target}`,
        source: params.source,
        target: params.target,
      };
      this.edges.push(newEdge);
      this.lastConnection = { source: params.source, target: params.target };
    },

    // 拖动右侧工具
    dragstart(item, dragElementIndex, event) {
      this.dragElement = dragElementIndex;
      event.dataTransfer.setData("text/plain", item.childName);
    },
    // 目标位置放置
    drop(event) {
      event.preventDefault();
      const text = event.dataTransfer.getData("text/plain");
      this.createDisplayElement(text, event.clientX, event.clientY);
    },
    createDisplayElement(text, x, y) {
      let nodeSelect = {};
      let position = {};
      let data = {};
      position.x = x - 100;
      position.y = y - 200;

      data.label = text; //中文名称
      data.type = "process";
      nodeSelect.id = this.dragElement; //工具id
      nodeSelect.type = "custom";
      nodeSelect.position = position;
      nodeSelect.data = data;
      this.nodes.push(nodeSelect);
    },
    onEdgeClick(event, edge) {
      // 选中边，可以通过按Delete键删除
      console.log("边被点击:", edge, event);
    },

    // 添加键盘事件监听器，用于删除选中的边
    handleKeyDown(event) {
      console.log("event", event, $event);
      if (event.key === "Delete") {
        // 在实际应用中，这里应该删除选中的边
        // 为了简化示例，我们删除最后添加的边
        if (edges.value.length > 0) {
          edges.value.pop();
        }
      }
    },
    // 展开/隐藏
    clickFather(windowIndex) {
      this.windowIndex[windowIndex] = !this.windowIndex[windowIndex];
    },

    showManagerDialogFunc() {
      this.showManagerDialog = true;
      this.showManagerRightDialog = true;
      console.log("showManagerDialog", this.showManagerDialog);
    },
    // 新增节点
    addFunc(edgeArray, uniqueNodeArrayInput, nodeSelfInfoInput) {
      add(edgeArray, uniqueNodeArrayInput, nodeSelfInfoInput).then((res) => {
        console.log("res", res);
        this.$modal.msgSuccess("服务创建成功");
      });
    },
    // 列表查询
    searchFlowService() {
      searchFlowService().then((res) => {
        this.serviceList = res;
        console.log(" this.serviceList", this.serviceList);
      });
    },
    // 根据 RelaId 查询
    SearchFlowByRelaId(relaId) {
      SearchFlowByRelaId(relaId).then((res) => {
        this.showServiceList = false; //展示主界面
        this.edges = [];
        this.nodes = [];
        let flowInfoStr = res.flowInfo;
        let flowInfoArray = flowInfoStr.split("&");
        console.log("flowInfoArray", flowInfoArray);
        //流程数据
        for (let i = 0; i < flowInfoArray.length; i++) {
          this.edges.push(JSON.parse(flowInfoArray[i]));
        }
        console.log("edges", this.edges);
        // 节点本身数据
        let nodeSelfInfo = res.nodeSelfInfo;
        for (let i = 0; i < nodeSelfInfo.length; i++) {
          this.nodes.push(JSON.parse(nodeSelfInfo[i]));
        }
        // 节点数据
        let nodeInfo = res.nodeInfo;
        for (let index = 0; index < nodeInfo.length; index++) {}
        console.log("formattedArraay", this.edges, this.nodes);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 0px;
  background-color: #fff;
  position: relative;

  .dashboard {
    display: flex;
    width: 100%;
    position: relative;

    .dashboard-left {
      position: relative;
      .button-abs {
        position: absolute;
        top: 10px;
        left: 10px;
        z-index: 10;
      }
      width: 100%;
      ::v-deep .van-tab {
        font-size: 18px !important;
      }
      #dropArea {
        width: 100%;
        height: 70%;
        position: relative;
        .container {
          // max-width: 1200px;
          // margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 20px;
          height: 100%;
        }

        ::v-deep .flow-container {
          display: flex;
          gap: 20px;
          height: 100%;
        }

        ::v-deep .flow-wrapper {
          flex: 3;
          height: 100%;
          background: white;
          border-radius: 10px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          overflow: hidden;
        }

        ::v-deep .custom-node {
          padding: 10px 15px;
          border-radius: 8px;
          background: white;
          border: 2px solid #3498db;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          min-width: 120px;
          text-align: center;
          font-weight: 500;
        }

        ::v-deep .custom-node.process {
          border-color: #2ecc71;
        }

        ::v-deep .custom-node.decision {
          border-color: #e74c3c;
        }

        ::v-deep .custom-node.output {
          border-color: #f39c12;
        }

        ::v-deep .vue-flow__edge-path {
          stroke: #3498db;
          stroke-width: 2;
          marker-end: url(#arrowhead);
        }

        ::v-deep .vue-flow__edge.selected .vue-flow__edge-path {
          stroke: #e74c3c;
          marker-end: url(#arrowheadRed);
        }

        ::v-deep .vue-flow__connection-line {
          stroke: #3498db;
          stroke-width: 2;
          marker-end: url(#arrowhead);
        }

        ::v-deep .vue-flow__connection-path {
          stroke: #3498db;
          stroke-width: 2px;
          marker-end: url(#arrowhead);
        }
      }

      .nodo-info {
        padding: 20px;
        font-size: 18px !important;

        .info {
          font-size: 20px;
        }

        .nodo-info-input {
          display: flex;
          width: 100%;

          .van-cell {
            font-size: 16px;
          }

          .van-cell::after {
            display: none;
          }
        }
      }

      .item {
        margin-left: 30px;
        width: 375px;
        height: 667px;
        border: 1px solid red;

        .background {
          margin-top: 20px;
          background-color: aquamarine;
        }

        .save {
          margin-top: 50px;
          width: 100%;
        }
      }
    }

    .dashboard-right {
      width: 400px;
      height: 100vh;
      background-color: #fff;
      border-left: 1px solid rgba(157, 157, 157, 0.2);

      .palette {
        padding-left: 10px;
        background-color: rgba(211, 211, 211, 0.5);
        height: 36px;
        border-bottom: 1px solid rgba(157, 157, 157, 0.2);
        font-size: 18px;
        display: flex;
        align-items: center;

        > img {
          width: 18px;
          height: 18px;
          margin-right: 6px;
        }
      }

      .mouse {
        padding-left: 10px;
        background-color: rgba(211, 211, 211, 0.5);
        height: 36px;
        border-bottom: 1px solid rgba(157, 157, 157, 0.2);
        display: flex;
        align-items: center;

        > img {
          width: 20px;
          height: 20px;
          margin-right: 6px;
        }
      }

      .fatherNme {
        padding-left: 10px;
        background-color: rgba(211, 211, 211, 0.5);
        height: 36px;
        line-height: 36px;
        font-size: 18px;

        .fatherNme-flex {
          display: flex;
          align-items: center;

          > img {
            width: 20px;
            height: 20px;
            margin-right: 6px;
          }
        }
      }

      .childName {
        padding-left: 20px;
        line-height: 30px;
        font-size: 16px;
        display: flex;
        align-items: center;
        cursor: default;

        > img {
          width: 20px;
          height: 20px;
          margin-right: 6px;
        }
      }

      .childName:hover {
        background-color: rgba(255, 165, 0, 0.5);
        /* 半透明橘色 */
        width: 180px;
      }
    }
  }
}
</style>
