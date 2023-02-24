<template>
  <div id="syl-box" class='show-content user_content clearfix enhanced ic-Layout-contentMain'>
    <div :class="['STV1_SlimBanner', this.$store.getters.getTheme.slim]"  style="width: 1054px;">
      <p>{{info.title.toUpperCase()}}</p>
    </div>

    <!-- Professors & TAs -->
    <div class="content-box">
      <div class="grid-row">

        <!-- Professor Info Box -->
        <div class="col-xs-6 col-md-6" v-for="prof in info.profs">
          <div class="styleguide-section__grid-demo-element pad-box-mini border border-tl">

            <!-- must have weeklyIconImg class for responsiveness -->
            <!-- landscape images work best. 350x200 seems ideal -->
            <div class="STV1_BlueBG">
              <img :src="prof.imgSrc" class="STV1_SyllabusPhoto" />
            </div>

            <p>Instructor:</p>
            <p>{{prof.name}} (<a :href="'mailto:'+prof.email">{{prof.email}}</a>) <br /> Office Hours: <span v-html="newLine(prof.office)"></span></p>
          </div>
        </div>
        <!-- End Professor Info Box -->

        <!-- Professor Info Box -->
        <div class="col-xs-6 col-md-6" v-for="ta in info.tas">
          <div class="styleguide-section__grid-demo-element pad-box-mini border border-tl">

            <!-- must have weeklyIconImg class for responsiveness -->
            <!-- landscape images work best. 350x200 seems ideal -->
            <div class="STV1_BlueBG">
              <img :src="ta.imgSrc" class="STV1_SyllabusPhoto" />
            </div>

            <p>Teaching Assistant:</p>
            <p>{{ta.name}} (<a :href="'mailto:'+ta.email">{{ta.email}}</a>) <br /> Office Hours: <span v-html="newLine(ta.office)"></span></p>
          </div>
        </div>
        <!-- End Professor Info Box -->

      </div>
    </div>
    <!-- End Professors & TAs -->

    <!-- Meeting Dates & Times -->
    <div class="content-box pad-box-mini border border-t border-b">
      <p>Meeting Dates/Times: Tuesday 9:00-10:50 am (IAB Room 411)</p>
      <p>Special Discussion Forums: Thursday 9:00-10:50 am (IAB Room 411)</p>
    </div>
    <!-- End Meeting Dates & Times -->

    <!-- Course Description -->
    <div v-if="info.sectionBox1.includes('Description')" class="content-box pad-box-mini border border-b">
      <h2>Course Description</h2>
      <div v-html="info.description"></div>
    </div>
    <!-- End Course Description -->

    <!-- Course Objectives -->
    <div v-if="info.sectionBox1.includes('Objectives')" class="content-box pad-box-mini border border-b">
      <h2>Course Objectives</h2>
      <p>Use this space here for course objectives.</p>
    </div>
    <!-- End Course Objectives -->

    <!-- Instruction Method -->
    <!-- <div class="content-box pad-box-mini border border-b">
      <h2>Method of Instruction</h2>
      <p>The course will achieve its learning objectives by deploying a combination of lectures, cases, readings,
        videos, role plays, debates, and discussions with experienced field and policy practitioners.</p>
    </div> -->
    <!-- End Instruction Method -->

    <!-- Weekly Schedule table -->
    <span v-if="info.sectionBox1.includes('Schedule')">
      <div class="content-box pad-box-mini border border-b">
        <h2>Weekly Schedule</h2>
      </div>

      <table class="ic-Table ic-Table--hover-row">
        <thead>
          <tr>

            <!-- Column Labels -->
            <!-- If you add a label here for an additional column, that column must be added to all rows as well -->
            <th>Week</th>
            <th v-if="info.useDates">Date</th>
            <th>Topic</th>
          </tr>
        </thead>
        <tbody>

           <tr v-for="(week, index) in weeks">
            <td>{{index + 1}}</td>
            <td v-if="info.useDates" >{{formatDate(week.date)}}</td>
            <td>{{week.title}}</td>
          </tr>
        </tbody>

      </table>
    </span>


    <!-- Grading -->
    <div v-if="info.sectionBox2.includes('Grading')" class="content-box pad-box-mini border border-b">
      <h2>Grading</h2>
      <p>Students will be graded through a Mid-term Exam (20%), two research/policy papers, together comprising 60% of the grade, and Class Participation (20%):</p>
      <ul>
        <li>Quiz on Weeks 1 to 6 lectures and readings, worth 20% of grade (Thursday March 2)</li>
        <li>Assignment 1, worth 20% of grade (1,250 words, due at 11:59 pm Sunday March 12)</li>
        <li>Assignment 2, worth 40% of grade (2,500 words, due at 11:59 pm Sunday May 7)</li>
      </ul>
    </div>
    <!-- End Grading -->

    <!-- Additional Resources -->
    <div v-if="info.sectionBox2.includes('Resources')" class="content-box pad-box-mini border border-b">
      <h2>Additional Resources</h2>
      <p>Beyond the weekly required and supplementary readings and viewings, the following resources are recommended if you are seeking to gain a superior level of understanding of the subject matter of this course. If you come across other interesting and useful
        resources relevant to the course objectives, please share these with the class through your blog posts.</p>
    </div>
    <div v-if="info.sectionBox2.includes('Integrity')" class="content-box pad-box-mini border border-b">
      <h2>Academic Integrity Statement</h2>
      <p>The School of International &amp; Public Affairs does not tolerate cheating and/or plagiarism in any form. Those students who violate the Code of Academic &amp; Professional Conduct will be subject to the Dean&rsquo;s Disciplinary Procedures. Cut and
        paste the following link into your browser to view the Code of Academic &amp; Professional Conduct online. <a href="http://bulletin.columbia.edu/sipa/academic-policies">http://bulletin.columbia.edu/sipa/academic-policies</a></p>
      <p><strong>Please note that, per the SIPA Code of Conduct, &ldquo;plagiarism includes but is not limited to:</strong></p>
      <ul>
        <li><strong>Submitting written work of any kind (e.g., reports, essays, exercises, papers), or portions of such written work that is not my own, but rather the written work of another author;</strong></li>
        <li><strong>Failing to acknowledge, through proper footnotes and bibliographic entries, the source of ideas not my own;</strong></li>
        <li><strong>Failing to indicate through proper use of quotations and footnotes whenever my work includes paraphrases of ideas or verbatim expressions not my own;</strong></li>
        <li><strong>Submitting written work prepared for one course to meet the requirements of a second course without having received in writing prior permission from both instructors;</strong></li>
        <li><strong>Collaborating with other students or outside sources on an assignment or examination without specific permission from the faculty member to do so;</strong></li>
        <li><strong>Using another person&rsquo;s or institution&rsquo;s research or data without attribution.&rdquo;</strong></li>
      </ul>
      <p>Please familiarize yourself with the proper methods of citation and attribution. The School provides some useful resources online; we strongly encourage you to familiarize yourself with these various styles before conducting your research:</p>
      <p>Violations of the Code of Academic &amp; Professional Conduct should be reported to the Associate Dean for Student Affairs.</p>
    </div>
    <!-- End Additional Resources -->

    <div class="clear">&nbsp;</div>


  </div>


</template>

<script>
import PageMixin from "../../components/mixins/page-mixin"
var moment = require("moment")

export default {
  data() {
    return {
      index: 1,
      editable: false
    }
  },
  computed: {
    currentItem() {
      return this.content[this.index - 1]
    }
  },
  methods: {
    returnCode() {
      console.log("returning syl code..")
      let code = document.getElementById("syl-box")
      return code.innerHTML.replace(/\bdata-v-\S+\"/gi, "")
    },
    formatDate(date) {
      return moment(date).format("MMMM Do")
    },
    newLine(val) {
      if (!val) return ""
      return val.replace(/\r?\n/g, "<br />")
    }
  },
  mixins: [PageMixin]
}
</script>

<style lang="css">
</style>
