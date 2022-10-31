//TODO: move html to config db or a lightweight cms
exports.sendEmail = ({ to, from, subject, message, firstName, transporter }) => {
  const mailOptions = {
    to,
    from,
    subject,
    html: `
    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout:fixed;background-color:#ffffff" id="bodyTable">
      <tbody>
        <tr>
          <td style="padding-right:10px;padding-left:10px;" align="center" valign="top" id="bodyCell">
            <table border="0" cellpadding="0" cellspacing="0" width="100%" class="wrapperBody" style="max-width:600px">
              <tbody>
                <tr>
                  <td align="center" valign="top">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" class="tableCard" style="background-color:#fff;border-color:#e5e5e5;border-style:solid;border-width:0 1px 1px 1px;">
                      <tbody>
                        <tr>
                          <td style="background-color:#F7B919;font-size:1px;line-height:3px" class="topBorder" height="3">&nbsp;</td>
                        </tr>
                        <tr>
                          <td style="padding-bottom: 20px; padding-top: 40px;" align="center" valign="top" class="imgHero">
                            <a href="#" style="text-decoration:none" target="_blank">
                              <img alt="" border="0" src="https://ci4.googleusercontent.com/proxy/g9UgwNTSr8TimvGx-Wts9wU7DE2x8BOunUzhu3ytEYuAvCCDEAn70BTuR0aJANPNgyOJqG8gx_mIM01cjHaDNOxs8NBFlLwR53krf1NLW2aQmQzwMXhUY6YzuudF9Pug6U0xzAq7gmYTe2H6xLRMuEKQzWONGCTNUw4YodVcltJIxizLMXdppZNOd13hnyF_Fu9Fhzh3ZHt5FFR5vJl7ysLJPQmOTziBI6p_2SIhWNy_3dgewUQaDtSpTMxX2qXTeAV340OiPF9U5no4-LwOdhZjSYxHBL-rGKZ_CT2HQBYPK6bx5Ta5oN1KMfd3q1KFWf_-FwSkMY33xjAq814MXgCi90Vh-Y71YorP5PddJdzvGXYK7w7R6llLsG_i-xQAkIfl2DYRPafxV1HM4szwUrv_mUcN5cTLBn4yiwt5qPnpNkMxXZcRpw7iOPas0qCS3hMXFEYcXuA2Wf4Oe0QKT3zmEpHG7fc-A4OE6dN9HLS8m9Dji5f_vRIYU14ldMlYPN8PuKaQkDzEvOhenLzCmx38ArAX_zukX7bQgy5WdBLZW-WVIfAs3FWV0HkbgA3_Yk4jXPLD_YdjDL5uivE=s0-d-e1-ft#https://4swyx.img.bh.d.sendibt3.com/im/2850889/46801f527d96781bea13f092735d771a2ccc167add5598cd8292fc110dcb2684.png?e=i7SmyCngJuvp6jg1E0Nkc_Hvb26wOi91hgWGQxJAyvSJk_5HgN2oz8P7HZ6V7yiprKsrcHlCYc74hcllEUWZvMsm92UOZ2oylzSXuAcMAIMSUONzIsN-Xb6B0NaJFJFuU4mfb04DsM3JXnPtERof5NrUXk31twaCXStcyKbShD5wxWTkTX_gynqB32JdCbCh7KuH5rsipueie3eLX0-pCmKluO4UFqSHjjMRDJm0BTMGcgQUz_xZ39hZ7-IWp5mMX2FmtpYq-I-jHrENOJA_-gCDnPEBB9yHEmObGL8Aj4ZqypDUv20G" style="width:100%;max-width:100px;height:auto;display:block;color: #f9f9f9;" width="100">
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding-bottom: 5px; padding-left: 20px; padding-right: 20px;" align="center" valign="top" class="mainTitle">

                            <h5 class="text" style="color:#000;font-family:Poppins,Helvetica,Arial,sans-serif;font-size:20px;font-weight:500;font-style:normal;letter-spacing:normal;line-height:36px;text-transform:none;text-align:center;padding:0;margin:0">Hi ${firstName}</h2>

                          </td>
                        </tr>
                        <tr>
                          <td style="padding-left:20px;padding-right:20px" align="center" valign="top" class="containtTable ui-sortable">
                            <table border="0" cellpadding="0" cellspacing="0" width="100%" class="tableDescription" style="">
                              <tbody>
                                <tr>
                                  <td style="padding-bottom: 20px;" align="center" valign="top" class="description">
                                    <p class="text" style="color:#000000;font-family:'Poppins', sans-serif;font-size:14px;font-weight:400;font-style:normal;letter-spacing:normal;line-height:22px;text-transform:none;text-align:center;padding:0;margin:0">Please click the button below to verify your email address.</p>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                            <table border="0" cellpadding="0" cellspacing="0" width="100%" class="tableButton" style="">
                              <tbody>
                                <tr>
                                  <td style="padding-top:20px;padding-bottom:20px" align="center" valign="top">
                                    <table border="0" cellpadding="0" cellspacing="0" align="center">
                                      <tbody>
                                        <tr>
                                          <td style="background-color:#F7B919; padding: 12px 35px; border-radius: 50px;" align="center" class="ctaButton"> <a href=${message} style="color:#ffffff;font-family:Poppins,Helvetica,Arial,sans-serif;font-size:13px;font-weight:600;font-style:normal;letter-spacing:1px;line-height:20px;text-transform:uppercase;text-decoration:none;display:block" target="_blank" class="text">Verify Email</a>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                        <tr>
                          <td style="font-size:1px;line-height:1px" height="20">&nbsp;</td>
                        </tr>
                        <tr>
                        <td style="padding-bottom:0px;" align="center" valign="top" class="description">
                          <p class="text" style="color:#000000;width:90%;font-family:'Poppins', sans-serif;font-size:14px;font-weight:400;font-style:normal;letter-spacing:normal;line-height:22px;text-transform:none;text-align:center;padding:0;margin:0">If the link above doesn't work, please copy and paste the following URL in to your browser:</p>
                        </td>
                      </tr>
                      <tr>
                      <td style="padding: 30px;" align="center" valign="top" class="description">
                        <a href=${message} class="text" style="color:#000000;font-family:'Poppins', sans-serif;font-size:14px;font-weight:400;font-style:normal;letter-spacing:normal;line-height:22px;text-transform:none;text-align:center;padding:0;margin:0">${message}</a>
                      </td>
                      </tr>
                      </tbody>
                    </table>
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" class="space">
                      <tbody>
                        <tr>
                          <td style="font-size:1px;line-height:1px" height="30">&nbsp;</td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
            <table border="0" cellpadding="0" cellspacing="0" width="100%" class="wrapperFooter" style="max-width:600px">
              <tbody>
                <tr>
                  <td align="center" valign="top">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" class="footer">
                      <tbody>
                        <tr>
                          <td style="padding-top:10px;padding-bottom:10px;padding-left:10px;padding-right:10px" align="center" valign="top" class="socialLinks">
                            <a href="https://www.tiktok.com/@loopnotluck" style="display: inline-block;" target="_blank" class="pintrest">
                              <img alt="" border="0" src="https://ci3.googleusercontent.com/proxy/kz-kex_ReEaGwefA9qIR3uDMNbhpQFKl8N_IeEPXfzai-ooh651275j_cy57HdtslOXi4yp6O6VUk3uDIWFfekmCdWpel1DbLIsSeDnhQDI9GtVXeSvLthnVMISMpYcMZE_QtlAS3ujVMqB4wzItLXwDn7w4PxJbgV0fTbc_REVoId47hz2g3e12F3e-4jy_rTEOc5apl2oY9yXQu-DFf7Fn7j3o_XRLsICdxRIbskc74Tzk7mw8kdbuuL0Tyvq62hhGbRzNrWSV6LhGGUZxG1LAOhFOxzAcVHqEPCbQ2cChtH4LJnA69nGn-FMifzDCbZrWEsaAgFXeBwcKIt0kfBC4hyIs_sXJmy0xnkWKqJyoZSpnsux7XGql6Bia87_N7QyvdSVOOTYTZPVUtwCj8YpjWfaBMzJx7F7ftQsmrliZIdVPQg-LVpLj43eqcKZIyFft26ID4CkYkXVm4KI8lPD7gaKf3EKi9Tm7LAYUrTqHm-qVQIf4hJ15RtGtqfzSi_hlX35v9lM5gTXcI9jbpZxr3mTllzMTCIBEORFnARasU9h1fLkAHy_UTZhAl_BAFRuaiIL0ZK2PtihXo6cmwQ=s0-d-e1-ft#https://4swyx.img.bh.d.sendibt3.com/im/2850889/d89706b2c58dd898e441f665d1f7cf35f38b7d4ca791afc6c652a9fe5995c0c5.png?e=ynHE-c08hiO-VF2OJTOk6wzfoRJ4AL_OXDf1VuTqUbPMLtf2QpGkt8Fi0BY36Lk3l-0mx3WNplBz8bLDQOT7nDiX1PxvpR9JJxlplFv6D6PAyjuULfb60uoUL2_4c5mX_nKbGNn0JdftuwlxdLwyJHa6eOWlLcFaQtDuDJIZ5GbtIiJdefjgWkYECoKBnvbCAJxOPkQ6Q7RP54lx4lehmxNfRFr_noIeahtbRx-EOq7fYyEVHpI74YvhzNCQE2dO4yTvJOGk1Z9QKilBLRe6oqir0m_39f5ZFrc82q7cIKw8fFztw580hg" style="height:auto;width:100%;max-width:40px;margin-left:2px;margin-right:2px" width="40">
                            </a>
                            <a href="https://www.instagram.com/loopnotluck/" style="display: inline-block;" target="_blank" class="instagram">
                              <img alt="" border="0" src="https://ci5.googleusercontent.com/proxy/k9-5iOE0P8Uq39-K3G6S0X7OWfw8xWVow9fAEkNiP0S20jBfWHaqGV0e-FF3ructnMhlw1aWOkJQiZ7dL9LAtuo4tPzFI7o6RwPblom8koO-okfBtTgeNAo6Klr-yN9Sw3c8LuVQxi-ee7TtgZ__SX7mKbDdjxkBEda1Smw83royBQ0q8w_4OPN_lDHVu7ucukHblSZRq9s2aU9Th9iQVTEB7yS_-YT84jTMF9fvPtXAuLBN9ZH2qa8EAmeKJ-tzNkZy4j4nGCNo7VZQSecpHWBUfpCMAyZ0Tk-6RGiUUBZO4s2UypdUejG5PDEOEaNOfbu7zATdklEEdJDRXN2H5K3Pj03ls6QPO_YhTxdMC-CKNxAQRSNv2DiEFpEFJMP1lCQt6jWopvQgeOpahbU5iF2TxMyi1f-S4rjqlkpLcoFvOXXa2UNwjyQp0arkuZiq2OvLq-FvWIIRnZzrMAJZ9mroziDQKN2jxhuQxJXiG0-VJy7SqjgNQ8mPQkSPJqW3tfqlmQe_Z88aCemVdsOHb4MGhsRO5Zx6SKsHA3iGjyt-zg81IrHa4genGlbFMVPjlK-owIhJidqNsj5SJh1wXLPyV3s=s0-d-e1-ft#https://4swyx.img.bh.d.sendibt3.com/im/2850889/a2d5caff7e377d05111f103275c69c8f6916cb599236855b93da7cdc776148a0.png?e=hTq1i5P29UrTk-WI5Iu3z6RrtfPGriRDVceAYr-hq0y0__RBRZFIMLOJU3Jy0x7iComefqh-rmN8Gzrm3rWKTIKNScqfNLu4D0e_vTJWPDM7rA1AEAi1EHeBlFfajlxPRtaCiERcKZhdxo7-iBfz27GfwMSWx7UpTcBJSHVTUBOmk7ZA_HbFtcfs86QI9q-_6gs0XaT355Wvv0CXg1Gd8m9RWabs8zjyg5OBbUDhFwTPJm97gQ146OybUvm6jYvCptTs-DTFfBeTx5DJuSKL_e5IN0GR-6nWsOyQDAHhJy0cZLzabqLy8_4A-g" style="height:auto;width:100%;max-width:40px;margin-left:2px;margin-right:2px" width="40">
                            </a>
                            <a href="https://www.linkedin.com/company/loopnotluck/" style="display: inline-block;" target="_blank" class="linkdin">
                              <img alt="" border="0" src="https://ci4.googleusercontent.com/proxy/2cTt7QvPE16FzFxy6XPQOyJRTxBH7sGMmHpL7IoEXEAVUaom1nhYbfVEi5DnU0JjxM2n-fflrdjxagFy59IMG6v0EW33YJHI17iEA6HqK_mPX6NkEqCMX-1kmNRQUOro5bX4dhwqEf_OOMkYjkIVunbiRrcIsmTbgQdSKg8bfmtM6O7YyL1uAF8CfyvcvVGNKmdIlcGkyeSgl2mpIVtxMSm781BZslWeIBPDqFaLrxuovOBoL37IIRA6SpO4wPVZqD3Pbn4CjATc1yA0HfuzPOvlYSAO40Pb9v9mbWFo880DcLFxjDEZWwqqU6SEh7FBGzaOVd9jNNZQ0ccuXXr4DAm5MYglBpimSAd7M-1x-IT0uFAHl2U62qp4OQnbXro0JAY0sVbkeyKmVdUN1JLlwHRDH2NvgapPPVbZDCIrJmQv6MYMumj005QhJHvcsCqUdtCBUoVEHMGSgZE3LN2QC0i3I8rfXUi2c-inHYGN7mDFgyJtacNL9l18IW-GCXkIT6eJS4PYrKtAL0pP3f7hsXGxhX6LVKS6mTngyuLnL_Bjre6mPZ9-GwKeU0fY5fgAkQHP1bf548mimm2Q-xKz-u6U=s0-d-e1-ft#https://4swyx.img.bh.d.sendibt3.com/im/2850889/63cf2dabbe7ba6fd26c2e23680b2ff93027553816a8d4d3908d53a3fbe9d2c8b.png?e=FOPo2iYEh_vhknI0r5kCJw0p3Ot8q_Rv_XXeparUX34qxJTEdHY3Gbbs-5nPUezkpXiEdaZ33MaxFkwSfn2RZzJSds0hMGwnxVHdyhab5imytW3MRYQ8g1606pDOMIz3uD8MaO3VmmYxFg5-CLg7BuJg8USkjYVGytK2r5suzeKBl1ceJHGyFrCoS2j58pNGEfCf0YkxolBBzywUgDoiraQbbWAKCXfPbbKmq-zgHfTsAnNM2x-p_0d3yxOw21C09QV9ecnA3Y2mKHwPtYIJJ8z6cH_QIX3drcZIxOxlx_g4Ga1WrZD1zL17" style="height:auto;width:100%;max-width:40px;margin-left:2px;margin-right:2px" width="40">
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding: 10px 10px 5px;" align="center" valign="top" class="brandInfo">
                            <p class="text" style="color:#000000;font-family:'Open Sans',Helvetica,Arial,sans-serif;font-size:12px;font-weight:400;font-style:normal;letter-spacing:normal;line-height:20px;text-transform:none;text-align:center;padding:0;margin:0">©&nbsp;Loop Not Luck Limited. | 64 KNIGHTSBRIDGE, LONDON SW1X 7JF.</p>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding: 0px 10px 20px;" align="center" valign="top" class="footerLinks">
                            <p class="text" style="color:#000000;font-family:'Open Sans',Helvetica,Arial,sans-serif;font-size:12px;font-weight:400;font-style:normal;letter-spacing:normal;line-height:20px;text-transform:none;text-align:center;padding:0;margin:0"> <a href="https://loopnotluck.com/" style="color:#000000;text-decoration:underline" target="_blank">https://loopnotluck.com/</a>
                            </p>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding: 0px 10px 10px;" align="center" valign="top" class="footerEmailInfo">
                            <p class="text" style="color:#000000;font-family:'Open Sans',Helvetica,Arial,sans-serif;font-size:12px;font-weight:400;font-style:normal;letter-spacing:normal;line-height:20px;text-transform:none;text-align:center;padding:0;margin:0">If you have any quetions please contact us <a href="mailto:hello@loopnotluck.com" style="color:#000000;text-decoration:underline" target="_blank">hello@loopnotluck.com.</a>
                          </td>
                        </tr>
                        <tr>
                          <td style="font-size:1px;line-height:1px" height="30">&nbsp;</td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="font-size:1px;line-height:1px" height="30">&nbsp;</td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  `,
  };

  return transporter.sendMail(mailOptions);
};
