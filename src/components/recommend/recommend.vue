<template>
  <div class="recommend" ref="recommend">
    <scroll ref="scroll" class="recommend-content" :data="discList">
      <div>
        <div v-if="recommends.length" class="slider-wrapper">
          <slider>
            <div v-for="item in recommends" :key="item.id">
              <a :href="item.linkUrl">
                <img class="needsclick" @load="loadImage" :src="item.picUrl"/>
              </a>
            </div>
          </slider>
        </div>
        <div class="recommend-list">
          <h1 class="list-title">热门歌单推荐</h1>
          <ul>
            <li @click="selectItem(item)" v-for="item in discList" class="item" :key="item.dissid">
              <div class="icon">
                <img width="60" height="60" v-lazy="item.imgurl" alt="">
              </div>
              <div class="text">
                <h2 class="name" v-html="item.creator.name"></h2>
                <p class="desc" v-html="item.dissname"></p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="loading-container" v-show="!discList.length">
        <loading></loading>
      </div>
    </scroll>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
import Loading from 'base/loading/loading'
import Slider from 'base/slider/slider'
import Scroll from 'base/scroll/scroll'
import { getRecommend, getDiscList } from 'api/recommend'
import { ERR_OK } from 'api/config'
import { playlistMixin } from 'common/js/mixin'
import { mapMutations } from 'vuex'

export default {
  mixins: [playlistMixin],
  data() {
    return {
      recommends: [
        {
          linkUrl:
            'https://y.qq.com/m/act/sfhd/166.html?ADTAG=jdt&openinqqmusic=1',
          picUrl:
            'http://y.gtimg.cn/music/common/upload/MUSIC_FOCUS/326604.jpg',
          id: 17328
        },
        {
          linkUrl:
            'http://y.qq.com/m/act/TidalWar/index.html?ADTAG=jiaodiantu&openinqqmusic=1',
          picUrl:
            'http://y.gtimg.cn/music/common/upload/MUSIC_FOCUS/327068.jpg',
          id: 17281
        },
        {
          linkUrl:
            'http://y.qq.com/m/act/sfhd/167.html?ADTAG=banner&openinqqmusic=1',
          picUrl:
            'http://y.gtimg.cn/music/common/upload/MUSIC_FOCUS/326485.jpg',
          id: 17301
        },
        {
          linkUrl:
            'https://y.qq.com/m/digitalbum/gold/index.html?_video=true&id=4182539&g_f=shoujijiaodian&openinqqmusic=1',
          picUrl:
            'http://y.gtimg.cn/music/common/upload/MUSIC_FOCUS/326178.jpg',
          id: 17290
        },
        {
          linkUrl: 'https://y.qq.com/msa/270/1_5875.html?openinqqmusic=1',
          picUrl:
            'http://y.gtimg.cn/music/common/upload/MUSIC_FOCUS/323823.jpg',
          id: 17262
        }
      ],
      discList: []
    }
  },
  created() {
    this._getRecommend()
    this._getDiscList()
  },
  methods: {
    handlePlaylist(playlist) {
      const bottom = playlist.length > 0 ? '60px' : ''
      this.$refs.recommend.style.bottom = bottom
      this.$refs.scroll.refresh()
    },
    selectItem(item) {
      this.$router.push({
        path: `/recommend/${item.dissid}`
      })
      this.setDisc(item)
    },
    _getRecommend() {
      getRecommend().then(res => {
        if (res.code === ERR_OK) {
          // this.recommends = res.data.slider
        }
      })
    },
    _getDiscList() {
      getDiscList().then((res) => {
        if (res.code === ERR_OK) {
          this.discList = res.data.list
        } else {
          console.log('没有回应')
        }
      })
    },
    loadImage() {
      if (!this.checkLoaded) {
        this.checkLoaded = true
        this.$refs.scroll.refresh()
      }
    },
    ...mapMutations({
      setDisc: 'SET_DISC'
    })
  },
  components: {
    Slider,
    Scroll,
    Loading
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable';

.recommend {
  position: fixed;
  width: 100%;
  top: 88px;
  bottom: 0;

  .recommend-content {
    height: 100%;
    overflow: hidden;

    .slider-wrapper {
      position: relative;
      width: 100%;
      overflow: hidden;
    }

    .recommend-list {
      .list-title {
        height: 65px;
        line-height: 65px;
        text-align: center;
        font-size: $font-size-medium;
        color: $color-theme;
      }

      .item {
        display: flex;
        box-sizing: border-box;
        align-items: center;
        padding: 0 20px 20px 20px;

        .icon {
          flex: 0 0 60px;
          width: 60px;
          padding-right: 20px;
        }

        .text {
          display: flex;
          flex-direction: column;
          justify-content: center;
          flex: 1;
          line-height: 20px;
          overflow: hidden;
          font-size: $font-size-medium;

          .name {
            margin-bottom: 10px;
            color: $color-text;
          }

          .desc {
            color: $color-text-d;
          }
        }
      }
    }

    .loading-container {
      position: absolute;
      width: 100%;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}
</style>