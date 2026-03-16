<template>
  <div class="spot-detail">
    <div class="main-content">
      <!-- 返回按钮 -->
      <div class="back-button">
        <a @click="goBack" class="back-link">← 返回</a>
      </div>

      <template v-if="spotInfo.title">
        <!-- 景点标题 -->
        <h1 class="spot-title">{{ spotInfo.title }}</h1>
        <div class="title-line"></div>

        <!-- 主要内容区域 -->
        <div class="spot-content">
          <div class="spot-image">
            <img :src="spotInfo.image" :alt="spotInfo.title">
          </div>
          <div class="spot-text" v-html="formattedDescription"></div>
        </div>

        <!-- 导览视频：文件需放在 public/guide-videos/ 下，文件名为 景点id.mp4 -->
        <div class="spot-video">
          <h3>导览视频</h3>
          <div class="video-wrap">
            <video
              :src="guideVideoSrc"
              controls
              class="guide-video"
              preload="metadata"
              playsinline
            >
              您的浏览器不支持视频播放。
            </video>
          </div>
        </div>

        <!-- 链接 -->
        <div class="spot-links">
          <h3>链接</h3>
          <div class="model-links-container" v-if="spotInfo.modelLinks && spotInfo.modelLinks.length">
            <a 
              v-for="(link, index) in spotInfo.modelLinks" 
              :key="index"
              :href="link.url" 
              target="_blank" 
              rel="noopener"
              class="spot-link"
            >
              {{ link.name }} →
            </a>
          </div>
          <p v-else class="no-links">暂无 3D 模型链接</p>
        </div>
      </template>
      <div v-else class="spot-not-found">
        <p>未找到该景点信息。</p>
      </div>

      <!-- 浏览量显示 -->
      <div class="view-count-section">
        <p>本页面访问量：<span class="view-count"><strong>{{ viewCount }}</strong> 次</span></p>
      </div>
    </div>
  </div>
</template>

<script>
import { getViewCount, incrementViewCount } from '../utils/viewCounter'

// 景点信息配置（每个 id 对应列表页一项，文案来自 1.md）
const spotData = {
  'jinchaji-outdoor': {
    title: '晋察冀纪念馆室外',
    image: '/red/jinchaji-outdoor.jpg',
    description: '晋察冀边区革命纪念馆总占地315亩，由休闲广场、主题展馆、雕像广场、旧址区、后山休闲区五部分组成，是全国爱国主义教育示范基地、国家AAAA级旅游景区、全国重点文物保护单位。雕像广场矗立着六组青铜雕塑，分别为聂荣臻和美穗子、邓拓与新闻战士、李勇和爆破组、戎冠秀与受伤战士、国际友人白求恩、狼牙山五壮士，生动再现了晋察冀边区的红色经典与动人故事。城南庄晋察冀军区司令部旧址是1947年秋聂荣臻司令员率领军区机关从张家口回迁阜平后修建的，占地1752平方米，前院矗立着聂荣臻铜像，气势恢弘；后院为三排二十一间土坯房，系毛主席、周恩来、任弼时等中央领导同志的宿办室，以及军区作战科、电话室和会议室。这里是晋察冀军区司令部在河北唯一完整保留的机关旧址，也是毛主席进京之前唯一完整保留的居住旧址，原址原貌，弥足珍贵。后山脚下有一条长约128米的防空洞，由晋察冀军区工兵连战士人工挖凿而成，至今保存完好，见证了当年战火纷飞岁月里的智慧与坚韧。整个景区松柏苍翠、环境优美，每年接待全国各地参观学习者数十万人次，是人们聆听历史回响、感悟领袖风采、继承革命传统的重要课堂。',
    modelLinks: [{ name: '晋察冀纪念馆室外 3D', url: 'http://106.38.198.74:8080/pcView/index.html?config=jinchaji_outdoor#/gaussian-splatting/lod-streaming' }]
  },
  'jinchaji-indoor': {
    title: '晋察冀纪念馆室内',
    image: '/red/jinchaji-indoor.jpg',
    modelLinks: [{ name: '晋察冀纪念馆室内 3D', url: 'http://106.38.198.74:8080/pcView/index.html?config=jinchaji_indoor#/gaussian-splatting/lod-streaming' }],
    description: '一号展厅建筑面积2200平方米，紧紧围绕“模范抗日根据地——晋察冀边区”的主题进行布展。1937年，聂荣臻同志以阜平为起点创建了晋察冀抗日根据地，这是中国共产党创建的第一块敌后抗日根据地，被毛泽东主席亲笔授予“模范抗日根据地”光荣称号。展厅运用大量珍贵照片、文物以及声、光、电、幻影成像等现代展陈技术，集中反映了晋察冀根据地的光辉历史和晋察冀军民的丰功伟绩。抗日战争时期，阜平人口不足10万，2万余人参军参战，5000余人英勇牺牲，为中华民族解放和新中国成立作出了巨大贡献。二号展厅建筑面积1550平方米，围绕“全国解放战争的战略基地与指挥中心”这一主题，按照历史脉络从抗战胜利后解放张家口到华北全境解放，分为进驻张家口、保卫解放区、巩固壮大解放区、组建华北解放区、参加大决战、欢庆华北全境解放6个章节，采取景观复原、触摸屏、雕塑等多种方式，展示了晋察冀解放区为解放战争胜利和新中国成立作出的卓越贡献。'
  },
  'luotuowan-outdoor': {
    title: '骆驼湾室外',
    image: '/red/luotuowan-outdoor.jpg',
    description: '骆驼湾村位于河北省阜平县城西38公里处，平均海拔1000米以上，森林覆盖率达64.7%，辖骆驼湾、瓦窑、辽道背、木桥、菜树塔、朱行塔、杨树塔、高石堂沟、藏粮沟等9个自然村，共295户582人。2012年12月30日，习近平总书记顶风踏雪来到这里访贫问苦，向全国发出了脱贫攻坚的动员令。彼时骆驼湾村贫困发生率高达79.4%，村民分布在最远距中心村8公里的自然村，除主村一条3米宽水泥路外，其他都是坑坑洼洼的石头路，只能勉强通行小推车和三轮车；村内大多是土坯房，几乎找不到一处水泥浇筑房屋。“山高沟深骆驼湾，石头缝里挣钱难”——这支山歌在太行山深处传唱了一代又一代。十余年来，骆驼湾村牢记总书记“宜农则农、宜林则林、宜牧则牧、宜开发生态旅游则搞生态旅游”的重要指示，统筹推进美丽乡村建设与特色产业发展，目前通过党支部领办合作社发展民宿137家，打造小吃美食街、茶室、年画馆、豆腐坊、面食坊、土特产售卖等业态20余个，带动956人务工，户均增收7000元。2025年11月，骆驼湾村入选文化和旅游部“世界最佳旅游乡村”储备名单。村民人均可支配收入由2012年底的950元增长至2025年底的28434元，增长了近30倍。村内先后荣获全国文明村镇、中国传统村落、中国美丽休闲乡村、国家森林乡村、全国乡村旅游重点村等称号，真正实现了从深度贫困村到乡村振兴样板的华丽蝶变。',
    modelLinks: [{ name: '骆驼湾室外 3D', url: 'http://106.38.198.74:8080/pcView/index.html?config=luotuo_village1#/gaussian-splatting/lod-streaming' }]
  },
  'luotuowan-1haoyuan': {
    title: '骆驼湾1号院',
    image: '/red/luotuowan-1haoyuan.jpg',
    description: '1号院是习近平总书记当年访贫问苦时到访的农户院落。2012年12月30日，总书记踏雪来到这里，与乡亲们围坐炕头，拉家常、问冷暖、听心声，详细了解乡亲们的生产生活困难，共商脱贫之策。这座保持着当年风貌的院子，土坯墙、木棂窗、老土炕，一切都如昨日。如今，这里已成为铭记总书记深切关怀、见证脱贫攻坚初心的重要地标，每年数以万计的党员干部、青年学生慕名而来，在这方简朴院落里感悟“江山就是人民，人民就是江山”的深刻内涵。它时刻提醒着人们不忘来时路，激励着人们在乡村振兴的新征程上继续奋斗。',
    modelLinks: [{ name: '骆驼湾1号院 3D', url: 'http://106.38.198.74:8080/pcView/index.html?config=luotuo_village2#/gaussian-splatting/lod-streaming' }]
  },
  'luotuowan-laofangzi': {
    title: '过去的日子',
    image: '/red/luotuowan-laofangzi.jpg',
    description: '这处保留的旧民居，真实再现了骆驼湾村昔日的贫困生活面貌。77岁的村民唐宗川在这里生活了一辈子，他回忆说，过去只有过年才能吃上一顿白面，平时的主食就是玉米面窝头和土豆。低矮昏暗的土坯房，墙面斑驳，屋顶瓦片残缺，屋内陈设简陋，土炕、旧灶台、老风箱，每一件物品都在无声诉说着当年的艰辛。而如今，骆驼湾村家家户户通地暖、通网络，出门见山、推窗见绿，成为京津冀游客向往的天然氧吧。这处老房子与新村新居形成鲜明对比，直观展现了脱贫攻坚带来的历史性巨变，让参观者深刻感悟到精准扶贫、精准脱贫方略的伟大意义。',
    modelLinks: [{ name: '过去的日子 3D', url: 'http://106.38.198.74:8080/pcView/index.html?config=luotuo_village3#/gaussian-splatting/lod-streaming' }]
  },
  'gujiatai-outdoor': {
    title: '顾家台室外',
    image: '/red/gujiatai-outdoor.jpg',
    modelLinks: [{ name: '顾家台室外 3D', url: 'http://106.38.198.74:8080/pcView/index.html?config=gu_village1#/gaussian-splatting/lod-streaming' }],
    description: '顾家台村是习近平总书记2012年考察扶贫开发工作时到访的第二个村庄。村庄因建在“台”子上而得名，沿盘旋山路而上，青瓦黄墙的精致民居依山就势、错落有致。在总书记亲切关怀和重要指示精神指引下，村庄通过发展食用菌、高山林果、家庭手工业及乡村旅游等特色产业，于2017年实现整村脱贫。2023年4月，顾家台村成立由村党支部创办的阜平县锦飞旅游农民专业合作社，采取“合作社+村集体+公司+农户”的模式，引进北京旅游经营公司，对全村景点、业态和农家乐进行整体规划改造，建立“五统一”（统一营销推广、统一服务质量、统一采购支出、统一分配客源、统一收费结算）联合经营模式。截至目前，合作社共有成员78户，其中18户村民住宅建成高端民宿小院采用固定租赁形式，60户村民住宅以房屋入股方式加入合作社，经营所获利润51%留于合作社发展资金，49%归入社成员分红。2023年，合作社收入21万元，带动25人就业，人均增收2万元，全年游客达40万余人次，旅游增收322万元，全村人均可支配收入由2012年底的980元增长至2023年底的22692元，村集体收入达101万元。'
  },
  'gujiatai-meeting': {
    title: '顾家台会议室',
    image: '/red/gujiatai-meeting.jpg',
    modelLinks: [{ name: '顾家台会议室 3D', url: 'http://106.38.198.74:8080/pcView/index.html?config=gu_village2#/gaussian-splatting/lod-streaming' }],
    description: '这间简朴的会议室是总书记当年与基层干部群众促膝座谈、共商脱贫之策的地方。在这里，“只要有信心，黄土变成金”等重要论述深入人心，点燃了乡亲们脱贫致富的希望，也为全国脱贫攻坚战谋划了清晰的路径。如今，这间会议室仍保持着当年的布置，长条桌、木椅子、旧茶缸，朴素无华中透着沉甸甸的历史分量。每年无数党员干部来到这里，坐在当年总书记坐过的位置，重温那段温暖而振奋人心的场景，从中汲取砥砺前行的精神力量。'
  },
  'gujiatai-chejian': {
    title: '帮扶车间',
    image: '/red/gujiatai-chejian.jpg',
    description: '帮扶车间是顾家台村巩固脱贫成果、助力乡村振兴的产业项目之一。通过引进皮具加工等劳动密集型产业，为村民特别是妇女和留守劳动力提供了“家门口”的就业岗位。车间内缝纫机声声作响，村民们在这里制作箱包、皮具等产品，实现了从“围着锅台转”到“踩着机器干”的人生转变。帮扶车间不仅是村民稳定增收的“致富工厂”，更成为“输血”变“造血”的生动实践。目前，顾家台村共吸引外出返乡青年38人，他们开办农家乐、啤酒花园、儿童乐园、露营烤肉基地，涌现了“听风院”精品民宿负责人刘娇、“90后”电商直播顾腾飞、顾小雪、耿迎香等一批返乡创业“网红”。刘娇大学毕业后回村创业，拆了自家老房子建起“听风院”，2023年小院营业收入达十几万元，今年又打造了拥有六间客房的“巷子里”新院子，为游客提供静谧与热闹两种不同风格的旅居体验。',
    modelLinks: [{ name: '帮扶车间 3D', url: 'http://106.38.198.74:8080/pcView/index.html?config=gu_village3#/gaussian-splatting/lod-streaming' }]
  },
  'pingshitou-outdoor': {
    title: '平石头村室外风景',
    image: '/green/pingshitou-outdoor.jpg',
    description: '平石头村坐落于太行山深处，是一座保留着旧时模样的传统村落，距今已有上千年历史。村名源于村北一块神奇的巨石——这块一人来高、平整光滑的巨石上表面足足有70多平方米，相传大旱之年村中水荒，百姓饮水无以为继时，巨石下面的山洞里忽然涌出股股清泉，救下了全村人的性命，平石头村由此得名。全村依山而建，一条潺潺小河贯穿村落，主干道与河道旁规划建设了绿化带，各色花草环绕百年古树。村内两棵千年以上的古树静静伫立——一棵是有着1500年树龄的古槐，正等待春风唤醒；另一棵是千年大叶桑，依然枝繁叶茂。村中随处可见形态各异的天然观赏奇石：将军石、心形石、香炉石、乌龟石，最大的巨石能有三层楼高，构成了一道道独特的风景。五崖寨位于村内，拥有好汉沟、黄落伞、摩天岭等自然景观，山顶有始建于隋唐时期的天然石佛堂，8尊石雕像雕刻于距今1400多年前，明代徐霞客曾赞叹其“瞻之愈出，趋之愈近，峭削之姿，遥遥逐人”。自2012年国家机关事务管理局选派中直第一书记驻村帮扶以来，工作队坚持“农为本、文为魂、旅为径”的发展思路，将生态优势转化为群众增收的“真金白银”。2023年仅民宿一项村里就收入50余万元，平石头村已成为京津冀热门旅游打卡地。',
    modelLinks: [{ name: '平石头村室外 3D', url: 'http://106.38.198.74:8080/pcView/index.html?config=stone_village1#/gaussian-splatting/lod-streaming' }]
  },
  'pingshitou-cunweihui': {
    title: '平石头村村委会',
    image: '/green/pingshitou-cunweihui.jpg',
    modelLinks: [{ name: '平石头村村委会 3D', url: 'http://106.38.198.74:8080/pcView/index.html?config=stone_village2#/gaussian-splatting/lod-streaming' }],
    description: '作为村庄发展的核心与窗口，平石头村村委会是各项惠民政策和产业规划落地实施的中枢。80后村党支部书记顾路红是一位念旧青年，他告诉记者：“我们这个村子是县里请专家专门给设计的。村里原有的旧平房进行了全面改造，迁过来的村民住进了新建的楼房。为了让大家不忘本，我们还特地保留了几套建于上世纪五六十年代的老房子”。在国家机关事务管理局驻村工作队的帮扶下，村委会推动硬化村内道路、实施民居改造、打造五崖寨景区品牌，累计协调落实各类资金426万元，建成多元化产业实体23处，直接创造就业岗位30个。2025年，村民人均可支配收入较2020年增长59%，年接待游客量达到常住人口的23倍。村委会墙上悬挂的“幸福生活是一代接一代干出来的”红色标语，正是平石头村党员干部群众的共同信念。'
  },
  'pingshitou-laofangzi': {
    title: '平石头村老房子',
    image: '/green/pingshitou-laofangzi.jpg',
    modelLinks: [{ name: '平石头村老房子 3D', url: 'http://106.38.198.74:8080/pcView/index.html?config=stone_village3#/gaussian-splatting/lod-streaming' }],
    description: '这两间保留完好的老房子，是平石头村沧桑岁月的活态见证。50-60年代的老屋为典型的土木石结构，黄泥抹墙、青瓦覆顶，低矮昏暗，室内狭窄逼仄，地面是夯实的三合土。70-80年代的老房子略见改善，墙体仍以石砌为主，但屋顶木梁更加规整，窗户也略大一些。这些老房子与周边新建的宜居民居和特色民宿形成鲜明对比——15座山村民宿错落分布于村中，均由村民闲置房屋改造而成，青水瓦、木挑梁、花格窗、石板院、黄泥墙的太行民居风貌得到完整保留，内部则按现代舒适标准精心打造。老房子已成为记录乡村历史、展现脱贫攻坚成就的鲜活教材，让参观者直观感受到“从土坯房到精品民宿”“从石头缝里刨食到端上旅游金饭碗”的时代变迁与发展温度。'
  },
  'minsu-shanli': {
    title: '平石头村-山里民宿',
    image: '/green/minsu-shanli.jpg',
    modelLinks: [{ name: '山里民宿 3D', url: 'http://106.38.198.74:8080/pcView/index.html?config=stone_village4#/gaussian-splatting/lod-streaming' }],
    description: '山里民宿坐落于阜平县平石头村，是由当地村民闲置房屋改造而成的15座山村民宿之一。民宿采用新中式双层合院结构，完整保留了青水瓦、木挑梁、花格窗、石板院的太行民居风貌，内部则按现代舒适标准精心打造。一层为挑高客厅、中式餐厅与禅意茶室，二层为静谧卧室，空间动静分离、功能分区明确。入住于此，可远眺五崖寨奇秀山峰，感受"久在樊笼里，复得返自然"的山居意趣。'
  },
  'minsu-dachuang': {
    title: '平石头-石屋大床房',
    image: '/green/minsu-dachuang.jpg',
    modelLinks: [{ name: '石屋大床房 3D', url: 'http://106.38.198.74:8080/pcView/index.html?config=stone_village5#/gaussian-splatting/lod-streaming' }],
    description: '此房型为标准大床间，房间保留了石屋的原始结构和墙面质感，室内配备了现代卫浴与舒适寝具，干湿分离的卫生间、柔软亲肤的床品、智能控制的灯光系统，让山居生活兼具野趣与品质。室内空间紧凑温馨，主要服务于情侣或单人旅客，为其提供一个安静私密的山居休憩核心。窗外即是山景，春有山花烂漫，夏有绿荫如盖，秋有层林尽染，冬有雪挂枝头。'
  },
  'minsu-shuangchuang': {
    title: '平石头-石屋双床房',
    image: '/green/minsu-shuangchuang.jpg',
    modelLinks: [{ name: '石屋双床房 3D', url: 'http://106.38.198.74:8080/pcView/index.html?config=stone_village6#/gaussian-splatting/lod-streaming' }],
    description: '该房间设有两张独立床铺，是专门为朋友结伴或家庭出行设计的实用房型。在石屋古朴的基调下，房间确保了每位住客都有独立的睡眠空间，兼顾了乡土体验与实际的住宿功能性需求。室内布局合理，两张床之间设有床头柜，方便放置随身物品。卫生间采用干湿分离设计，热水即开即热，山泉水温润肌肤，可容纳2-3人舒适入住。'
  },
  'minsu-taofang': {
    title: '平石头-石屋套房',
    image: '/green/minsu-taofang.jpg',
    description: '此套房为双层复式结构，是吾家小院的升级房型。楼下为起居活动空间，摆放着布艺沙发、原木茶几、小书架，营造出温暖居家氛围；楼上为静谧的卧室区域，设有1.8米大床，透过天窗可观星赏月。双层设计不仅增添了居住的面积，也有效区隔了休闲与睡眠功能，适合家庭或小团体入住。室内装饰点缀着老物件——或许是村民用过多年的煤油灯，或许是老式搪瓷茶缸，在保有石屋风貌的同时，提供了更舒适、更宽敞的山居体验。',
    modelLinks: [{ name: '石屋套房 3D', url: 'http://106.38.198.74:8080/pcView/index.html?config=stone_village8#/gaussian-splatting/lod-streaming' }]
  },
  'minsu-xiaoyuan': {
    title: '平石头-石屋小院',
    image: '/green/minsu-xiaoyuan.jpg',
    description: '石屋小院是民宿的共享庭院，一个精心打造的户外休闲空间。院内设有挂着星星月亮灯的秋千，夜幕降临，暖黄色的小灯串亮起，如星子坠落人间；配备顶篷与球形灯的休闲桌椅，可供游客品茶闲坐、读书聊天；一旁还有小片菜地，种着时令蔬菜，游客可体验采摘之乐；小凉亭飞檐翘角，亭内置石桌石凳，夏日纳凉最是惬意。这里白天可沐浴阳光、呼吸山野清气，夜晚灯光点缀、秋千轻摇，格外温馨浪漫，是住客放松身心、感受乡村闲适氛围的核心公共区域。',
    modelLinks: [{ name: '石屋小院 3D', url: 'http://106.38.198.74:8080/pcView/index.html?config=stone_village7#/gaussian-splatting/lod-streaming' }]
  },
  'minsu-taihang': {
    title: '平石头-太行民宿',
    image: '/green/minsu-taihang.jpg',
    modelLinks: [{ name: '太行民宿 3D', url: 'http://106.38.198.74:8080/pcView/index.html?config=stone_village9#/gaussian-splatting/lod-streaming' }],
    description: '"太行民宿"是平石头村中一间由村民闲置石屋改造而成的特色民宿，位于遍布石板路与石屋的村落深处。民宿建筑充分体现了"青水瓦、木挑梁、花格窗、石板院、黄泥墙"的典型冀西太行民居风格，外观保留了原汁原味的乡土韵味——老瓦片是百年前的旧物，木挑梁历经风雨却依然坚实，花格窗棂雕工朴拙。驻村工作队引入专业旅游运营公司提升服务品质，推出"线上直播引流+线下推广拓客"经营模式，旅游旺季民宿入住率常态保持在90%以上。住客在此可品尝榆皮面饸饹、阜平八大碗、杂烩菜、摊黄、煎饼、烤土豆等本地特色美食，体验"久在樊笼里，复得返自然"的陶渊明式田园情结。民宿主人热情好客，常与住客分享村庄故事、采摘时令山果，让每一位到访者都能感受到太行山的温度。'
  },
  'tianshengqiao-erpu': {
    title: '天生桥门口到二瀑',
    image: '/geological/tianshengqiao-erpu.jpg',
    description: '阜平天生桥国家地质公园位于太行山东麓，晋冀交界处，东北距北京295公里，西距佛教圣地五台山48公里，总面积50平方公里，是一处集地质、地貌、冰川、生态、人文景观为一体的国家AAAA级旅游景区、国家地质公园、国家森林公园。景区以“中国北方最大的瀑布群”“中国最大的片麻岩天生桥”“罕见的原始次生林”为主体，被誉为“太行山深处的香格里拉”。从景区入口至第二瀑布“银河瀑”的这段旅程，是开启地质奇观探索的精华序幕。景区地貌类型为构造侵蚀断块山，峰峦重叠，苍山如海，地形标高850米至2144.5米，最高点为百草坨。瀑布群由变质岩形成，九条大瀑布集中于一沟，高低错落，丰水期飞流直下如万马奔腾，声响如雷；枯水期潺潺流水如撒珠抛玉，声韵清脆；冬季瀑水成冰，冰柱晶莹，姿态各异，是北方冬季罕见的冰瀑奇观。天生桥长27米、宽13米、拱高13米，坐落于落差112.5米的瑶台瀑布顶端，是我国首次发现的变质岩天生桥，岩石距今已有28至29亿年历史，是500公里太行山脉中最独特的地层结构系统，享有“五台东门户，京津西花园，华北古基石，绿水济平川”的盛名。天生桥的形成源于山谷瀑流沿裂隙经亿万年冲蚀崩塌，桥上长树，桥下流水，上游紧靠落差60米的第八瀑布，八瀑、九瀑相连，立桥观望瀑水从天而降，瀑花飞溅入涵洞，穿洞而过越深渊，山、水、树、桥交相辉映，堪称自然造化的神来之笔。',
    modelLinks: [{ name: '天生桥门口到二瀑 3D', url: 'http://106.38.198.74:8080/pcView/index.html?config=natural_bridge#/gaussian-splatting/lod-streaming' }]
  },
  'tianshengqiao-xiaogouzao1': {
    title: '天生桥小构造1',
    image: '/geological/tianshengqiao-xiaogouzao1.jpg',
    modelLinks: [{ name: '天生桥小构造1 3D', url: 'http://106.38.198.74:8080/pcView/index.html?config=natural_bridge1#/gaussian-splatting/lod-streaming' }],
    description: '不整合地层分界线代表了地壳运动留下的重要时间缺页。它表现为新老岩层之间一个起伏不平的古剥蚀面，如同一本被撕去若干章节的地质史书。其形成过程可追溯至数十亿年前：地壳曾整体抬升，使早期沉积的地层露出水面，遭受长期的风化、剥蚀、搬运，形成了这个波状起伏的侵蚀面。这个过程可能持续数千万年甚至数亿年，期间该地区处于陆相环境，没有新的沉积物保存下来。之后，该地区再次下沉，海水或湖水侵入，接受了新的沉积物覆盖，从而将亿万年的地质历史间断清晰地记录在这个接触界面上。不整合面之下是时代较老的阜平群片麻岩，之上是时代较新的沉积岩层，中间缺失了数亿年的岩层记录，是研究该区地壳升降运动、古地理环境变迁的关键地质遗迹。'
  },
  'tianshengqiao-xiaogouzao2': {
    title: '天生桥小构造2',
    image: '/geological/tianshengqiao-xiaogouzao2.jpg',
    modelLinks: [{ name: '天生桥小构造2 3D', url: 'http://106.38.198.74:8080/pcView/index.html?config=natural_bridge2#/gaussian-splatting/lod-streaming' }],
    description: '断层是地壳岩石受力破裂后，沿破裂面发生显著位移的地质构造。其形态表现为线性延伸的破裂面或由碎裂岩石组成的破碎带，宽度从几厘米到数米不等，常在地表形成陡崖、沟谷、断层崖或水系错动等地貌景观。其形成源于地球内部构造运动产生的巨大构造应力，当应力超过岩石强度极限时，岩石便突然破裂并沿破裂面滑动，瞬间释放累积的能量——这就是地震的成因。此处的断层面上可能保留有断层擦痕、阶步等滑动痕迹，指示着断层运动的方向；断层带内岩石被挤压破碎成角砾岩、糜棱岩，见证了亿万年前这里曾发生过的剧烈构造运动。断层不仅是地壳运动的直接证据，也常常控制着区域地貌发育、地下水的运移通道和矿产资源的分布。'
  },
  'tianshengqiao-xiaogouzao3': {
    title: '天生桥小构造3',
    image: '/geological/tianshengqiao-xiaogouzao3.jpg',
    modelLinks: [{ name: '天生桥小构造3 3D', url: 'http://106.38.198.74:8080/pcView/index.html?config=natural_bridge3#/gaussian-splatting/lod-streaming' }],
    description: '这是一处清晰典型的X型共轭节理构造，是岩石受剪切应力作用的珍贵地质遗迹。其形成于特定构造应力场的持续作用中：岩石在水平挤压或伸展的剪切力驱动下，沿两组相交的最大剪切面发生破裂，两组破裂面彼此交叉，夹角约60°-90°，最终形成这组呈完美X形交叉的裂隙网络。节理面平直光滑，产状稳定，延伸较远，显示其剪切成因。在这片区域，X节理不仅将完整岩体分割成菱形块状，还主导着后期风化与水流的路径——雨水沿节理缝隙渗入，冻融作用不断扩张裂隙，使岩体沿节理面碎裂剥落；那些覆盖着残雪的节理面，在斜阳映照下纹理格外清晰，还留存着应力作用下的细微擦痕，与周围呈菱形破碎的岩块一起，印证了这里曾经历的复杂而强烈的剪切形变过程。'
  },
  'tianshengqiao-xiaogouzao4': {
    title: '天生桥小构造4',
    image: '/geological/tianshengqiao-xiaogouzao4.jpg',
    modelLinks: [{ name: '天生桥小构造4 3D', url: 'http://106.38.198.74:8080/pcView/index.html?config=natural_bridge4#/gaussian-splatting/lod-streaming' }],
    description: '这是一处清晰的小型层间挠曲，是岩层在弱应力作用下发生局部塑性形变的典型地质痕迹。其形成于相对温和的构造应力或重力滑动过程中：岩层未发生破裂，仅沿层理面产生小范围的连续弯曲，形似舒缓的波浪，最终呈现出蓝色圈内这道优美的弧形层理轨迹。挠曲核部岩层加厚，翼部岩层变薄，反映岩石在应力作用下发生了物质调整。在这片区域，这处微挠曲既完整保留了层理的连续性，又呈现出局部的弯曲形态——它是沉积环境波动、同生变形或后期弱应力的产物，规模仅局限于局部岩层，对岩体整体结构的影响相对轻微，却是研究区域应力场特征、岩石力学性质及变形历史的重要微观证据。'
  },
  'bowuguan-tunnel': {
    title: '地质博物馆隧道',
    image: '/geological/bowuguan-tunnel.jpg',
    description: '格致自然资源科普博物馆位于阜平县城南庄镇向阳庄村71号，是一座集展示、教育、科普为一体的自然博物馆。博物馆由室外和室内两大展区组成：室外展区设“格园风物”与“岩象千重”，展示太行山中部山区常见动植物及典型岩石构造标本；室内展区设“将今论古”“矿晶纷呈”“琼珠溢彩”“海田遗痕”等七个展项，涵盖地质学、矿物学、岩石学、宝玉石学等多方面内容。馆内岩石标本数不胜数，是中小学生研学实践、公众了解自然资源知识的理想场所。',
    modelLinks: [{ name: '地质博物馆隧道 3D', url: 'http://106.38.198.74:8080/pcView/index.html?config=geological_tunnel#/gaussian-splatting/lod-streaming' }]
  }
}

export default {
  name: 'SpotDetail',
  data() {
    return {
      viewCount: 0,
      spotInfo: {}
    }
  },
  computed: {
    guideVideoSrc() {
      const id = this.$route.params.id
      return id ? '/guide-videos/' + id + '.mp4' : ''
    },
    formattedDescription() {
      const text = this.spotInfo.description || ''
      const escaped = text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
      const paragraphs = escaped.split(/\n\n+/).filter(p => p.trim())
      if (paragraphs.length === 0) return ''
      return paragraphs.map(p => `<p>${p.replace(/\n/g, '<br>')}</p>`).join('')
    }
  },
  mounted() {
    const spotId = this.$route.params.id
    this.spotInfo = spotData[spotId] || {}
    
    // 记录浏览量
    const pageName = `SpotDetail_${spotId}`
    this.viewCount = incrementViewCount(pageName)
  },
  methods: {
    goBack() {
      // 根据当前路径判断返回到哪个资源列表页
      const path = this.$route.path
      if (path.includes('/red-resources/')) {
        this.$router.push('/red-resources')
      } else if (path.includes('/green-resources/')) {
        this.$router.push('/green-resources')
      } else if (path.includes('/geological-resources/')) {
        this.$router.push('/geological-resources')
      } else {
        this.$router.push('/')
      }
    }
  }
}
</script>

<style scoped>
.spot-detail {
  min-height: 100vh;
  background: white;
}

.back-button {
  margin-bottom: 20px;
}

.back-link {
  color: #dc2626;
  text-decoration: none;
  font-size: 16px;
  display: inline-block;
  padding: 8px 16px;
  border-radius: 5px;
  transition: background 0.3s;
  cursor: pointer;
}

.back-link:hover {
  background: #f5f5f5;
}

.spot-title {
  font-size: 32px;
  color: #333;
  margin-bottom: 15px;
  font-weight: bold;
}

.title-line {
  width: 100%;
  height: 3px;
  background: #dc2626;
  margin-bottom: 30px;
}

.spot-content {
  display: flex;
  gap: 30px;
  margin-bottom: 40px;
  align-items: flex-start;
}

.spot-image {
  flex: 0 0 500px;
  min-width: 500px;
}

.spot-image img {
  width: 100%;
  height: 375px;
  object-fit: cover;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  display: block;
}

.spot-text {
  flex: 1;
  line-height: 1.8;
  color: #666;
  font-size: 16px;
  padding-top: 10px;
}

.spot-text p {
  margin: 0 0 1em 0;
  font-size: 16px;
  line-height: 1.8;
}

.spot-text p:last-child {
  margin-bottom: 0;
}

.spot-video {
  margin-top: 40px;
  margin-bottom: 30px;
}

.spot-video h3 {
  font-size: 20px;
  color: #333;
  margin-bottom: 15px;
}

.video-wrap {
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  aspect-ratio: 16 / 9;
  border-radius: 10px;
  overflow: hidden;
  background: #000;
}

.guide-video {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: contain;
}

.video-placeholder {
  background: #f5f5f5;
  border-radius: 10px;
  padding: 40px 20px;
  text-align: center;
  color: #999;
  border: 2px dashed #ddd;
  width: 100%;
  font-size: 14px;
}

.video-placeholder p {
  margin: 0;
}

.spot-links {
  margin-top: 20px;
}

.spot-links h3 {
  font-size: 20px;
  color: #333;
  margin-bottom: 15px;
}

.model-links-container {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.spot-link {
  display: inline-block;
  padding: 12px 24px;
  background: #dc2626;
  color: white;
  text-decoration: none;
  border-radius: 8px;
  transition: background 0.3s;
  text-align: center;
}

.spot-link:hover {
  background: #b91c1c;
}

.no-links {
  color: #999;
  font-size: 14px;
  margin: 0;
}

.spot-not-found {
  padding: 40px 0;
  text-align: center;
  color: #666;
}

.view-count-section {
  margin-top: 40px;
  padding: 20px;
  background: #f5f5f5;
  border-radius: 10px;
}

.view-count {
  display: inline-block;
  background: white;
  padding: 5px 15px;
  border-radius: 20px;
  font-size: 14px;
  color: #666;
  margin-left: 10px;
}

.view-count strong {
  color: #dc2626;
}

@media (max-width: 768px) {
  .spot-content {
    flex-direction: column;
  }
  
  .spot-image {
    flex: 1;
    width: 100%;
    min-width: 100%;
  }
  
  .spot-image img {
    height: 250px;
  }
  
  .spot-title {
    font-size: 24px;
  }
  
  .video-placeholder {
    padding-bottom: 56.25%;
  }
}
</style>

