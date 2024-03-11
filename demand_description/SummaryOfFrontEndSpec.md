Summary top level

1. Dashboard Page:
   • Display high-level data for quick user assessment.
   Show the number of events, categorized by type and priority.
   • Show the number of known devices and known subnets.
   • Include sections for "Top Talkers" (systems generating the most traffic), "Top Talking Networks" (subnets with the most traffic), and a list of the newest devices along with their subnet locations, addresses, and first appearance.
   • Show a paged table of all known devices on the network
   • Default to a 24-hour data view with options for date range adjustments.
   • Provide search functionality for code, IP address, and port.
   • Include tooltips with descriptions for all items to assist unsophisticated clients.
2. Investigation Page:
   • Similar to the existing page but with an added tab to switch between events listing and net flows listing.
   • Allow users to investigate communications associated with IP addresses over time, including data volume and event details.
   • IP Search must also allow for non-ip strings, and this should search names of devices.
   Searches must allow users to prepend "-" to the search string, this will inform the backend that it is to be excluded from the search.
3. Device View Page:
   • Display detailed information about a specific device.
   • Show data generated and received over a specified timeframe, top communication partners (devices and DNS results), device location, type, and name.
   • Show which protocols are used by the device.
   • Show tooltips for protocols, type, and known communication partners.
   • Allow the user to override the name of a given device.
4. Subnet View Page:
   • Graphically represent the topology of a subnet.
   • Show nodes for local devices in orange and remote devices in red (colors subject to change), with link thickness scaling based on the proportion of data sent.
   • Include connections to the internet and other internal subnets.
   • Allow users to attach a "tag" or "custom name" to subnets. This tag should be visible in the subnet view.
5. Configuration Page:
   • Allow users to configure "fireflies" (devices or agents) by querying an API for a list of known
   fireflies.
   • Enable users to set or change the name, subnet, and associated firebug for each firefly.
   • Indicate whether a firefly is configured (green light) or not (red light).
   The API is expected to provide all necessary datasets to populate these pages, and the focus of the project is to develop the frontend to meet these use cases. Code exists for the old frontend, but is not
   required to be used. Frontend is expected to use Tremor. API definition exists and should have been provided with this specification document.

## 翻译

1. 仪表板页面：

   - 显示高级别数据，便于用户快速评估。 展示按类型和优先级分类的事件数量。
   - 显示已知设备和已知子网的数量。
   - 包括“最活跃通讯者”（产生最多流量的系统）的部分，“最活跃通讯网络”（流量最多的子网）以及最新设备及其子网位置、地址和首次出现的列表。
   - 展示一个分页的表格，列出网络上所有已知的设备。
   - 默认展示24小时数据视图，并提供日期范围调整选项。
   - 提供代码、IP地址和端口的搜索功能。
   - 包括所有项目的工具提示，以帮助非专业客户。

2. 调查页面：

   - 类似于现有页面，但增加了一个标签以切换事件列表和网络流量列表。
   - 允许用户调查与IP地址相关的通信，可以选定任意时间段内的数据量和详情。
   - IP搜索还必须允许非IP字符串搜索，这应该搜索设备的名称。搜索必须允许用户在搜索字符串前添加“-”，这将通知后端从搜索中排除该字符串。

3. 设备视图页面：

   - 显示关于特定设备的详细信息。
   - 在选定时间框架内显示设备生成和接收的数据，主要通讯对象（设备和DNS结果）、设备位置、类型和名称。
   - 显示设备使用的协议。
   - 显示关于协议、类型和已知通信伙伴的工具提示。
   - 允许用户重写指定设备的名称。

4. 子网视图页面：

   - 图形化地表示子网的拓扑结构。
   - 分别以橙色和红色显示本地和远程设备（颜色可能变化），并根据发送的数据比例调整链接粗细。
   - 包括到互联网和其他内部子网的连接。
   - 允许用户为子网附加“标签”或“自定义名称”。这个标签应该在子网视图中可见。

5. 配置页面：
   - 允许用户查询API以获取已知的“火绒”列表，并对这些“火绒”（设备或代理）进行配置。
   - 使用户能够为每个火绒设置或更改名称、子网和关联的火绒。
   - 显示一个火绒是否已配置（绿灯）或未配置（红灯）。

API预计将提供所有必要的数据集来填充这些页面，本项目的重点是开发前端以满足这些用例。现有的旧代码可以提供一些功能，但不一定非要使用旧代码。前端使用[Tremor](https://tremor.so/)，API已经提供。
