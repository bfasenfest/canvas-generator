import { isDate } from "moment"

export default {
  home:
    `
  <html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>Home</title>
    <meta name="identifier" content="ccb-home" />
    <meta name="editing_roles" content="teachers" />
    <meta name="workflow_state" content="active" />
    <meta name="front_page" content="true" />
  </head>
  <body>`,
  syllabus:
    `<html>
  <head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
  <title>Syllabus</title>
  </head>
  <body>`,
  list: `
  <html>
  <head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
  <title>Activities</title>
  <meta name="identifier" content="ccb-weekly-list"/>
  <meta name="editing_roles" content="teachers"/>
  <meta name="workflow_state" content="active"/>
  </head>
  <body>`,
  studentList: `
  <html>
  <head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
  <title>Student List</title>
  <meta name="identifier" content="ccb-student-list"/>
  <meta name="editing_roles" content="teachers"/>
  <meta name="workflow_state" content="active"/>
  </head>
  <body>`,
  zoom: `
  <html>
  <head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
  <title>Zoom</title>
  <meta name="identifier" content="ccb-zoom"/>
  <meta name="editing_roles" content="teachers"/>
  <meta name="workflow_state" content="active"/>
  </head>
  <body>`,
  top:
    `<html>
  <head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>`,
  bottom:
    `<meta name="editing_roles" content="teachers"/>
  <meta name="workflow_state" content="active"/>
  </head>
  <body>`,
  week_ids_old: ['if302854aacc829d35bf66aa3014848d6', 'ic158ad382e8fbb40e02e3fd26d20f3ba', 'i019b1c6d7cd8f7ea4cce83827ebd1e20', 'i875f0e1604f5f9c32a4ed8814fdb9f83',
    'i1000053de4e9ce99f26a002b4dc63e62', 'i48ce2374bdbd8eddcb1eba27912728e2', 'i4f7624f9d9e7bebb1745d478c205bb27', 'i34502ccc1509d3778b61d5f7e724b9b3',
    'i4eb840cf9229e00e2d4283355d0e2f18', 'i84924dec81b1b0cf46ca629490ac2978'], // 10 so far here
  weekly_redirect_top:
    `<?xml version="1.0" encoding="UTF-8"?>
  <cartridge_basiclti_link xmlns="http://www.imsglobal.org/xsd/imslticc_v1p0" xmlns:blti="http://www.imsglobal.org/xsd/imsbasiclti_v1p0" xmlns:lticm="http://www.imsglobal.org/xsd/imslticm_v1p0" xmlns:lticp="http://www.imsglobal.org/xsd/imslticp_v1p0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.imsglobal.org/xsd/imslticc_v1p0 http://www.imsglobal.org/xsd/lti/ltiv1p0/imslticc_v1p0.xsd&#10;                          http://www.imsglobal.org/xsd/imsbasiclti_v1p0 http://www.imsglobal.org/xsd/lti/ltiv1p0/imsbasiclti_v1p0p1.xsd&#10;                          http://www.imsglobal.org/xsd/imslticm_v1p0 http://www.imsglobal.org/xsd/lti/ltiv1p0/imslticm_v1p0.xsd&#10;                          http://www.imsglobal.org/xsd/imslticp_v1p0 http://www.imsglobal.org/xsd/lti/ltiv1p0/imslticp_v1p0.xsd">
    <blti:title>Activities</blti:title>
    <blti:description>Add links to external web resources that show up as navigation items in course, user or account navigation. Whatever URL you specify is loaded within the content pane when users click the link.</blti:description>
    <blti:secure_launch_url>https://www.edu-apps.org/redirect</blti:secure_launch_url>
    <blti:icon>https://www.edu-apps.org/assets/lti_redirect_engine/redirect_icon.png</blti:icon>
    <blti:vendor>
      <lticp:code>unknown</lticp:code>
      <lticp:name>unknown</lticp:name>
    </blti:vendor>  
    <blti:custom>
  `,
  zoom_redirect_top:
    `<?xml version="1.0" encoding="UTF-8"?>
  <cartridge_basiclti_link xmlns="http://www.imsglobal.org/xsd/imslticc_v1p0" xmlns:blti="http://www.imsglobal.org/xsd/imsbasiclti_v1p0" xmlns:lticm="http://www.imsglobal.org/xsd/imslticm_v1p0" xmlns:lticp="http://www.imsglobal.org/xsd/imslticp_v1p0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.imsglobal.org/xsd/imslticc_v1p0 http://www.imsglobal.org/xsd/lti/ltiv1p0/imslticc_v1p0.xsd&#10;                          http://www.imsglobal.org/xsd/imsbasiclti_v1p0 http://www.imsglobal.org/xsd/lti/ltiv1p0/imsbasiclti_v1p0p1.xsd&#10;                          http://www.imsglobal.org/xsd/imslticm_v1p0 http://www.imsglobal.org/xsd/lti/ltiv1p0/imslticm_v1p0.xsd&#10;                          http://www.imsglobal.org/xsd/imslticp_v1p0 http://www.imsglobal.org/xsd/lti/ltiv1p0/imslticp_v1p0.xsd">
    <blti:title>Zoom</blti:title>
    <blti:description>Add links to external web resources that show up as navigation items in course, user or account navigation. Whatever URL you specify is loaded within the content pane when users click the link.</blti:description>
    <blti:secure_launch_url>https://www.edu-apps.org/redirect</blti:secure_launch_url>
    <blti:icon>https://www.edu-apps.org/assets/lti_redirect_engine/redirect_icon.png</blti:icon>
    <blti:vendor>
      <lticp:code>unknown</lticp:code>
      <lticp:name>unknown</lticp:name>
    </blti:vendor>  
    <blti:custom>
  `,
  student_list_redirect_top:
    `<?xml version="1.0" encoding="UTF-8"?>
  <cartridge_basiclti_link xmlns="http://www.imsglobal.org/xsd/imslticc_v1p0" xmlns:blti="http://www.imsglobal.org/xsd/imsbasiclti_v1p0" xmlns:lticm="http://www.imsglobal.org/xsd/imslticm_v1p0" xmlns:lticp="http://www.imsglobal.org/xsd/imslticp_v1p0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.imsglobal.org/xsd/imslticc_v1p0 http://www.imsglobal.org/xsd/lti/ltiv1p0/imslticc_v1p0.xsd&#10;                          http://www.imsglobal.org/xsd/imsbasiclti_v1p0 http://www.imsglobal.org/xsd/lti/ltiv1p0/imsbasiclti_v1p0p1.xsd&#10;                          http://www.imsglobal.org/xsd/imslticm_v1p0 http://www.imsglobal.org/xsd/lti/ltiv1p0/imslticm_v1p0.xsd&#10;                          http://www.imsglobal.org/xsd/imslticp_v1p0 http://www.imsglobal.org/xsd/lti/ltiv1p0/imslticp_v1p0.xsd">
    <blti:title>Student List</blti:title>
    <blti:description>Add links to external web resources that show up as navigation items in course, user or account navigation. Whatever URL you specify is loaded within the content pane when users click the link.</blti:description>
    <blti:secure_launch_url>https://www.edu-apps.org/redirect</blti:secure_launch_url>
    <blti:icon>https://www.edu-apps.org/assets/lti_redirect_engine/redirect_icon.png</blti:icon>
    <blti:vendor>
      <lticp:code>unknown</lticp:code>
      <lticp:name>unknown</lticp:name>
    </blti:vendor>  
    <blti:custom>
  `,
  redirect_bottom:
    `  </blti:custom>
    <blti:extensions platform="canvas.instructure.com">
      <lticm:property name="tool_id">redirect</lticm:property>
      <lticm:property name="privacy_level">anonymous</lticm:property>
      <lticm:property name="icon_url">https://www.edu-apps.org/assets/lti_redirect_engine/redirect_icon.png</lticm:property>
      <lticm:property name="link_text"></lticm:property>
      <lticm:options name="course_navigation">
        <lticm:property name="enabled">true</lticm:property>
        <lticm:property name="visibility">public</lticm:property>
      </lticm:options>
    </blti:extensions>
  </cartridge_basiclti_link>`,
  discussion_meta_bottom:
    `<delayed_post_at>2017-01-06T05:00:00</delayed_post_at>
  <position/>
  <type>topic</type>
  <discussion_type>side_comment</discussion_type>
  <has_group_category>false</has_group_category>
  <workflow_state>active</workflow_state>
  <module_locked>false</module_locked>
  <allow_rating>false</allow_rating>
  <only_graders_can_rate>false</only_graders_can_rate>
  <sort_by_rating>false</sort_by_rating>
  <todo_date/>
</topicMeta>
  `
}

let heading = {
  home:
    `
  <html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>Home</title>
    <meta name="identifier" content="i95bef606c8b4f001957aa6848c66310f" />
    <meta name="editing_roles" content="teachers" />
    <meta name="workflow_state" content="active" />
    <meta name="front_page" content="true" />
  </head>
  <body>`,
  syllabus:
    `<html>
  <head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
  <title>Syllabus</title>
  </head>
  <body>`
}
