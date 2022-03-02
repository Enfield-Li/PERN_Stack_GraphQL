import { MigrationInterface, QueryRunner } from "typeorm";

export class new1644229078863 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        insert into post ("createdAt", "updatedAt", title, contents, "creatorId", "votePoints", "likePoints", "laughPoints", "confusedPoints") values ('2021-10-28', '2021-03-13', 'Mama', 'Phasellus in felis. Donec semper sapien a libero. Nam dui.

Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.

Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.', 1, 18, 5, 5, 0);
insert into post ("createdAt", "updatedAt", title, contents, "creatorId", "votePoints", "likePoints", "laughPoints", "confusedPoints") values ('2020-11-18', '2021-03-21', 'Cose da pazzi', 'Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.

Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.

Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.

Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.', 5, 10, 1, 8, 5);
insert into post ("createdAt", "updatedAt", title, contents, "creatorId", "votePoints", "likePoints", "laughPoints", "confusedPoints") values ('2021-01-20', '2021-11-01', 'Steamboat Bill, Jr.', 'Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.

Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.', 3, 3, 4, 4, 2);
insert into post ("createdAt", "updatedAt", title, contents, "creatorId", "votePoints", "likePoints", "laughPoints", "confusedPoints") values ('2020-12-09', '2021-02-26', 'Trouble in Paradise', 'In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.

Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.', 2, 19, 4, 0, 5);
insert into post ("createdAt", "updatedAt", title, contents, "creatorId", "votePoints", "likePoints", "laughPoints", "confusedPoints") values ('2021-06-16', '2021-05-08', 'Kid Cannabis', 'Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.

Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.

Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.', 2, 6, 5, 1, 1);
insert into post ("createdAt", "updatedAt", title, contents, "creatorId", "votePoints", "likePoints", "laughPoints", "confusedPoints") values ('2021-03-27', '2021-12-01', 'An American Tail: The Treasure of Manhattan Island', 'In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.

Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.

Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.', 5, 3, 5, 4, 0);
insert into post ("createdAt", "updatedAt", title, contents, "creatorId", "votePoints", "likePoints", "laughPoints", "confusedPoints") values ('2020-12-29', '2021-01-06', 'Prisoner of Zenda, The', 'Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.

Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.

Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.

Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.', 2, 10, 3, 6, 0);
insert into post ("createdAt", "updatedAt", title, contents, "creatorId", "votePoints", "likePoints", "laughPoints", "confusedPoints") values ('2021-05-10', '2021-04-30', 'Class of 1999 II: The Substitute', 'Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.

Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.

Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.

Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.', 1, 4, 3, 6, 0);
insert into post ("createdAt", "updatedAt", title, contents, "creatorId", "votePoints", "likePoints", "laughPoints", "confusedPoints") values ('2021-10-07', '2021-07-31', 'Trailer Park Jesus', 'Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.

Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.

Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.

Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.', 5, 7, 3, 9, 3);
insert into post ("createdAt", "updatedAt", title, contents, "creatorId", "votePoints", "likePoints", "laughPoints", "confusedPoints") values ('2021-04-03', '2022-01-30', 'Hilary and Jackie', 'Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.

Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.

Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.', 2, 15, 5, 0, 0);
insert into post ("createdAt", "updatedAt", title, contents, "creatorId", "votePoints", "likePoints", "laughPoints", "confusedPoints") values ('2021-12-01', '2021-08-21', 'Space Battleship Yamato', 'Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.

Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.

Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.

Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.', 1, 0, 1, 3, 4);
insert into post ("createdAt", "updatedAt", title, contents, "creatorId", "votePoints", "likePoints", "laughPoints", "confusedPoints") values ('2022-02-17', '2021-02-27', 'Warning from Space (Uchûjin Tôkyô ni arawaru)', 'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.

Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.

Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.

Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.', 4, 19, 3, 4, 0);
insert into post ("createdAt", "updatedAt", title, contents, "creatorId", "votePoints", "likePoints", "laughPoints", "confusedPoints") values ('2021-01-11', '2021-01-19', '1984', 'Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.

Phasellus in felis. Donec semper sapien a libero. Nam dui.

Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.', 5, 11, 4, 2, 1);
insert into post ("createdAt", "updatedAt", title, contents, "creatorId", "votePoints", "likePoints", "laughPoints", "confusedPoints") values ('2021-04-08', '2021-08-29', 'Map For Saturday, A', 'Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.

Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.

Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.

Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.', 1, 8, 3, 2, 0);
insert into post ("createdAt", "updatedAt", title, contents, "creatorId", "votePoints", "likePoints", "laughPoints", "confusedPoints") values ('2021-09-10', '2021-04-22', 'Bey Yaar', 'Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.

Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.

Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.

Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.', 1, 19, 3, 10, 4);
insert into post ("createdAt", "updatedAt", title, contents, "creatorId", "votePoints", "likePoints", "laughPoints", "confusedPoints") values ('2022-02-02', '2021-08-12', 'Day of the Crows, The (Le jour des corneilles)', 'Fusce consequat. Nulla nisl. Nunc nisl.

Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.', 3, 3, 4, 2, 3);
insert into post ("createdAt", "updatedAt", title, contents, "creatorId", "votePoints", "likePoints", "laughPoints", "confusedPoints") values ('2021-08-19', '2021-09-25', 'Graveyard Shift (Stephen King''s Graveyard Shift)', 'Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.

Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.', 3, 1, 1, 0, 0);
insert into post ("createdAt", "updatedAt", title, contents, "creatorId", "votePoints", "likePoints", "laughPoints", "confusedPoints") values ('2021-10-15', '2021-04-14', 'Orderers (Les ordres)', 'Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.

Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.

Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.', 4, 0, 1, 0, 0);
insert into post ("createdAt", "updatedAt", title, contents, "creatorId", "votePoints", "likePoints", "laughPoints", "confusedPoints") values ('2021-12-16', '2021-09-05', 'Tasting Menu', 'Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.

Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.', 4, 0, 0, 9, 3);
insert into post ("createdAt", "updatedAt", title, contents, "creatorId", "votePoints", "likePoints", "laughPoints", "confusedPoints") values ('2021-08-15', '2021-09-23', 'Ultimate Gift, The', 'Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.

Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.', 4, 16, 4, 2, 0);
insert into post ("createdAt", "updatedAt", title, contents, "creatorId", "votePoints", "likePoints", "laughPoints", "confusedPoints") values ('2021-02-02', '2021-04-04', 'Bride of Frankenstein, The (Bride of Frankenstein)', 'Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.

Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.

Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.

Fusce consequat. Nulla nisl. Nunc nisl.', 3, 0, 1, 9, 0);
insert into post ("createdAt", "updatedAt", title, contents, "creatorId", "votePoints", "likePoints", "laughPoints", "confusedPoints") values ('2021-11-19', '2022-02-25', 'Divine Madness!', 'Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.

Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.

Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.

Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.', 5, 16, 1, 0, 0);
insert into post ("createdAt", "updatedAt", title, contents, "creatorId", "votePoints", "likePoints", "laughPoints", "confusedPoints") values ('2021-01-15', '2020-12-03', 'Little Men', 'Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.

Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.', 5, 4, 1, 0, 4);
insert into post ("createdAt", "updatedAt", title, contents, "creatorId", "votePoints", "likePoints", "laughPoints", "confusedPoints") values ('2021-12-20', '2022-01-09', 'Cotton Club, The', 'Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.

Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.

Curabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.', 5, 7, 0, 4, 0);
insert into post ("createdAt", "updatedAt", title, contents, "creatorId", "votePoints", "likePoints", "laughPoints", "confusedPoints") values ('2021-08-30', '2022-01-19', 'Gloria', 'Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.

Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.

Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.', 5, 5, 0, 7, 3);
insert into post ("createdAt", "updatedAt", title, contents, "creatorId", "votePoints", "likePoints", "laughPoints", "confusedPoints") values ('2020-11-09', '2021-11-29', '7th Heaven (Seventh Heaven)', 'Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.

Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.', 2, 15, 1, 2, 0);
insert into post ("createdAt", "updatedAt", title, contents, "creatorId", "votePoints", "likePoints", "laughPoints", "confusedPoints") values ('2021-12-02', '2022-02-20', 'Confessions of a Dangerous Mind', 'Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.

Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.

Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.', 5, 15, 2, 3, 0);
insert into post ("createdAt", "updatedAt", title, contents, "creatorId", "votePoints", "likePoints", "laughPoints", "confusedPoints") values ('2020-11-06', '2021-09-13', 'Life and Nothing But (Vie et rien d''autre, La)', 'Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.

Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.

Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.

Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.', 2, 0, 0, 0, 0);
insert into post ("createdAt", "updatedAt", title, contents, "creatorId", "votePoints", "likePoints", "laughPoints", "confusedPoints") values ('2022-02-09', '2021-04-20', 'Nevada Smith', 'Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.

Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.

Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.', 3, 9, 1, 2, 2);
insert into post ("createdAt", "updatedAt", title, contents, "creatorId", "votePoints", "likePoints", "laughPoints", "confusedPoints") values ('2021-10-24', '2021-09-19', 'Too Hot to Handle', 'Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.

Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.

Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.

Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.', 2, 7, 0, 7, 5);
insert into post ("createdAt", "updatedAt", title, contents, "creatorId", "votePoints", "likePoints", "laughPoints", "confusedPoints") values ('2021-06-21', '2021-02-07', 'Spinout', 'Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.

Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.', 4, 0, 5, 3, 5);
insert into post ("createdAt", "updatedAt", title, contents, "creatorId", "votePoints", "likePoints", "laughPoints", "confusedPoints") values ('2021-01-26', '2022-02-07', 'Paradine Case, The', 'Sed ante. Vivamus tortor. Duis mattis egestas metus.

Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.', 2, 7, 3, 9, 0);
insert into post ("createdAt", "updatedAt", title, contents, "creatorId", "votePoints", "likePoints", "laughPoints", "confusedPoints") values ('2021-07-24', '2021-12-29', 'This Is Elvis', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus.

Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.

Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.

Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.', 5, 18, 0, 1, 0);
insert into post ("createdAt", "updatedAt", title, contents, "creatorId", "votePoints", "likePoints", "laughPoints", "confusedPoints") values ('2021-02-01', '2021-04-18', 'George Lopez: It''s Not Me, It''s You', 'Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.

Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.

Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.', 5, 1, 0, 2, 3);
insert into post ("createdAt", "updatedAt", title, contents, "creatorId", "votePoints", "likePoints", "laughPoints", "confusedPoints") values ('2021-03-15', '2021-07-27', 'Bang Bang Club, The', 'Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.

Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.

Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.', 5, 14, 3, 0, 3);
insert into post ("createdAt", "updatedAt", title, contents, "creatorId", "votePoints", "likePoints", "laughPoints", "confusedPoints") values ('2020-12-28', '2021-12-24', 'Payday', 'Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.

Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.

Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.', 5, 17, 1, 5, 0);
insert into post ("createdAt", "updatedAt", title, contents, "creatorId", "votePoints", "likePoints", "laughPoints", "confusedPoints") values ('2021-07-03', '2022-01-14', 'Sleep Dealer', 'Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.

Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.

Fusce consequat. Nulla nisl. Nunc nisl.

Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.', 4, 0, 0, 0, 4);
insert into post ("createdAt", "updatedAt", title, contents, "creatorId", "votePoints", "likePoints", "laughPoints", "confusedPoints") values ('2021-06-15', '2021-05-01', 'No End in Sight', 'Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.

Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.

Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.', 3, 9, 2, 0, 0);
insert into post ("createdAt", "updatedAt", title, contents, "creatorId", "votePoints", "likePoints", "laughPoints", "confusedPoints") values ('2021-06-02', '2021-08-25', 'Juwanna Mann', 'Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.

Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.', 4, 1, 4, 3, 1);
insert into post ("createdAt", "updatedAt", title, contents, "creatorId", "votePoints", "likePoints", "laughPoints", "confusedPoints") values ('2021-03-07', '2021-11-10', 'Santos', 'Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.

Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.

Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.

Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.', 5, 6, 1, 9, 0);
insert into post ("createdAt", "updatedAt", title, contents, "creatorId", "votePoints", "likePoints", "laughPoints", "confusedPoints") values ('2022-02-07', '2021-09-10', 'Couch in New York, A', 'Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.

Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.

Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.

In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.', 3, 11, 2, 10, 0);
insert into post ("createdAt", "updatedAt", title, contents, "creatorId", "votePoints", "likePoints", "laughPoints", "confusedPoints") values ('2021-11-14', '2021-09-19', 'Zatoichi', 'Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.

Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.', 3, 0, 0, 0, 3);
insert into post ("createdAt", "updatedAt", title, contents, "creatorId", "votePoints", "likePoints", "laughPoints", "confusedPoints") values ('2021-06-12', '2021-01-16', 'Forsyte Saga, The', 'Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.

Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.

Curabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.', 5, 13, 1, 10, 0);
insert into post ("createdAt", "updatedAt", title, contents, "creatorId", "votePoints", "likePoints", "laughPoints", "confusedPoints") values ('2020-12-12', '2021-02-19', 'Safety of Objects, The', 'Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.

Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.

Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.', 1, 0, 0, 0, 1);
insert into post ("createdAt", "updatedAt", title, contents, "creatorId", "votePoints", "likePoints", "laughPoints", "confusedPoints") values ('2021-10-27', '2021-07-20', 'Witches'' Hammer (Kladivo na carodejnice) ', 'Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.

Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.

Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.

Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.', 5, 1, 1, 7, 2);
insert into post ("createdAt", "updatedAt", title, contents, "creatorId", "votePoints", "likePoints", "laughPoints", "confusedPoints") values ('2022-02-09', '2022-02-21', '2 Become 1 (Tin sun yut dui)', 'Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.

Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.

Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.', 1, 0, 0, 0, 4);
insert into post ("createdAt", "updatedAt", title, contents, "creatorId", "votePoints", "likePoints", "laughPoints", "confusedPoints") values ('2021-04-09', '2021-05-22', 'Earth Entranced (Terra em Transe)', 'Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.

Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.', 1, 9, 1, 9, 0);
insert into post ("createdAt", "updatedAt", title, contents, "creatorId", "votePoints", "likePoints", "laughPoints", "confusedPoints") values ('2021-04-05', '2021-10-04', 'I Never Promised You a Rose Garden', 'Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.

In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.', 5, 0, 0, 0, 0);
insert into post ("createdAt", "updatedAt", title, contents, "creatorId", "votePoints", "likePoints", "laughPoints", "confusedPoints") values ('2021-07-17', '2021-09-12', 'When a Man Loves a Woman', 'Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.

Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.

Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.

In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.', 1, 9, 0, 4, 0);
insert into post ("createdAt", "updatedAt", title, contents, "creatorId", "votePoints", "likePoints", "laughPoints", "confusedPoints") values ('2021-07-14', '2022-01-03', 'Kingdom, The (Riget)', 'Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.

Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.', 5, 18, 1, 3, 3);
insert into post ("createdAt", "updatedAt", title, contents, "creatorId", "votePoints", "likePoints", "laughPoints", "confusedPoints") values ('2021-06-20', '2021-04-25', 'Marketa Lazarová', 'Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.

Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.

Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.', 3, 18, 1, 9, 0);
insert into post ("createdAt", "updatedAt", title, contents, "creatorId", "votePoints", "likePoints", "laughPoints", "confusedPoints") values ('2020-12-12', '2021-12-09', 'Where Sleeping Dogs Lie', 'Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.

In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.

Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.

Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.', 5, 0, 0, 0, 3);
insert into post ("createdAt", "updatedAt", title, contents, "creatorId", "votePoints", "likePoints", "laughPoints", "confusedPoints") values ('2021-04-02', '2022-02-03', 'The Walking Hills', 'Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.

Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.

In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.

Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.', 4, 12, 3, 7, 0);
insert into post ("createdAt", "updatedAt", title, contents, "creatorId", "votePoints", "likePoints", "laughPoints", "confusedPoints") values ('2021-09-28', '2022-02-01', 'Invitation to Happiness', 'Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.

Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.

Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.

Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.', 2, 14, 4, 3, 0);
insert into post ("createdAt", "updatedAt", title, contents, "creatorId", "votePoints", "likePoints", "laughPoints", "confusedPoints") values ('2021-12-04', '2021-08-29', 'Traffic Affairs (Mitfahrer)', 'Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.

In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.

Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.', 2, 20, 2, 7, 5);
insert into post ("createdAt", "updatedAt", title, contents, "creatorId", "votePoints", "likePoints", "laughPoints", "confusedPoints") values ('2021-10-05', '2021-09-22', 'Hum Dil De Chuke Sanam', 'Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.

Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.

Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.

Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.', 1, 3, 3, 3, 0);
insert into post ("createdAt", "updatedAt", title, contents, "creatorId", "votePoints", "likePoints", "laughPoints", "confusedPoints") values ('2021-03-03', '2021-08-02', 'Snakes on a Plane', 'Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.

Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.

Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.

Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.', 4, 10, 5, 0, 1);
insert into post ("createdAt", "updatedAt", title, contents, "creatorId", "votePoints", "likePoints", "laughPoints", "confusedPoints") values ('2021-06-20', '2021-09-24', 'Northern Lights', 'Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.

Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.

In congue. Etiam justo. Etiam pretium iaculis justo.

In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.', 1, 0, 0, 0, 3);
insert into post ("createdAt", "updatedAt", title, contents, "creatorId", "votePoints", "likePoints", "laughPoints", "confusedPoints") values ('2021-06-02', '2021-05-13', 'Reflecting Skin, The', 'Phasellus in felis. Donec semper sapien a libero. Nam dui.

Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.

Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.', 3, 16, 0, 7, 0);
insert into post ("createdAt", "updatedAt", title, contents, "creatorId", "votePoints", "likePoints", "laughPoints", "confusedPoints") values ('2021-06-22', '2021-08-10', 'On the Outs', 'Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.

Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.

Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.', 1, 2, 5, 0, 3);
insert into post ("createdAt", "updatedAt", title, contents, "creatorId", "votePoints", "likePoints", "laughPoints", "confusedPoints") values ('2021-09-14', '2021-09-10', 'Dead or Alive 2: Tôbôsha', 'Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.

Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.', 1, 1, 4, 2, 5);
insert into post ("createdAt", "updatedAt", title, contents, "creatorId", "votePoints", "likePoints", "laughPoints", "confusedPoints") values ('2022-02-24', '2021-10-18', 'Fairly Odd Movie: Grow Up, Timmy Turner!, A', 'Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.

Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.', 5, 2, 2, 10, 2);
insert into post ("createdAt", "updatedAt", title, contents, "creatorId", "votePoints", "likePoints", "laughPoints", "confusedPoints") values ('2021-10-04', '2021-04-12', 'Robber, The (Der Räuber)', 'Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.

Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.', 2, 19, 2, 3, 5);
insert into post ("createdAt", "updatedAt", title, contents, "creatorId", "votePoints", "likePoints", "laughPoints", "confusedPoints") values ('2021-05-06', '2021-04-09', 'Point and Shoot', 'Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.

Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.

Phasellus in felis. Donec semper sapien a libero. Nam dui.', 5, 0, 0, 0, 0);
insert into post ("createdAt", "updatedAt", title, contents, "creatorId", "votePoints", "likePoints", "laughPoints", "confusedPoints") values ('2021-05-31', '2021-06-30', 'Against The Sun', 'Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.

Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.', 5, 0, 0, 0, 5);
insert into post ("createdAt", "updatedAt", title, contents, "creatorId", "votePoints", "likePoints", "laughPoints", "confusedPoints") values ('2021-09-17', '2021-02-26', 'Jazz Singer, The', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus.

Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.

Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.', 1, 16, 0, 1, 0);
insert into post ("createdAt", "updatedAt", title, contents, "creatorId", "votePoints", "likePoints", "laughPoints", "confusedPoints") values ('2022-01-02', '2021-03-12', 'Upside Down: The Creation Records Story', 'Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.

In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.

Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.

Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.', 3, 1, 1, 8, 4);
insert into post ("createdAt", "updatedAt", title, contents, "creatorId", "votePoints", "likePoints", "laughPoints", "confusedPoints") values ('2021-03-02', '2021-05-31', 'Beverly Hills Ninja', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus.

Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.

Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.

Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.', 4, 17, 3, 8, 4);
insert into post ("createdAt", "updatedAt", title, contents, "creatorId", "votePoints", "likePoints", "laughPoints", "confusedPoints") values ('2021-04-15', '2021-09-01', 'Her', 'Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.

Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.

Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.

Fusce consequat. Nulla nisl. Nunc nisl.', 1, 6, 0, 8, 1);
insert into post ("createdAt", "updatedAt", title, contents, "creatorId", "votePoints", "likePoints", "laughPoints", "confusedPoints") values ('2021-04-20', '2021-02-08', 'Jimmy''s Hall', 'In congue. Etiam justo. Etiam pretium iaculis justo.

In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.

Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.

Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.', 4, 15, 3, 3, 1);
insert into post ("createdAt", "updatedAt", title, contents, "creatorId", "votePoints", "likePoints", "laughPoints", "confusedPoints") values ('2021-01-31', '2020-12-26', 'Scooby-Doo', 'Phasellus in felis. Donec semper sapien a libero. Nam dui.

Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.

Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.', 2, 7, 2, 7, 2);
insert into post ("createdAt", "updatedAt", title, contents, "creatorId", "votePoints", "likePoints", "laughPoints", "confusedPoints") values ('2021-05-27', '2021-02-19', 'Anaconda', 'Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.

Phasellus in felis. Donec semper sapien a libero. Nam dui.

Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.', 3, 0, 0, 0, 2);
insert into post ("createdAt", "updatedAt", title, contents, "creatorId", "votePoints", "likePoints", "laughPoints", "confusedPoints") values ('2021-05-29', '2021-10-18', 'Millennium', 'Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.

Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.

Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.

Curabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.', 5, 8, 2, 8, 0);
insert into post ("createdAt", "updatedAt", title, contents, "creatorId", "votePoints", "likePoints", "laughPoints", "confusedPoints") values ('2021-10-22', '2021-07-16', 'Wayne''s World', 'Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.

Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.

Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.

Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.', 4, 3, 3, 7, 0);
insert into post ("createdAt", "updatedAt", title, contents, "creatorId", "votePoints", "likePoints", "laughPoints", "confusedPoints") values ('2021-12-12', '2021-08-26', 'People, Places, Things', 'Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.

Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.

Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.', 1, 9, 4, 8, 1);
insert into post ("createdAt", "updatedAt", title, contents, "creatorId", "votePoints", "likePoints", "laughPoints", "confusedPoints") values ('2021-03-07', '2020-12-07', 'Locusts, The', 'Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.

Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.', 4, 0, 3, 7, 0);
insert into post ("createdAt", "updatedAt", title, contents, "creatorId", "votePoints", "likePoints", "laughPoints", "confusedPoints") values ('2021-12-12', '2020-11-14', 'Devil Came on Horseback, The', 'Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.

Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.', 1, 14, 1, 2, 5);
insert into post ("createdAt", "updatedAt", title, contents, "creatorId", "votePoints", "likePoints", "laughPoints", "confusedPoints") values ('2021-01-12', '2021-02-04', 'Brick Mansions', 'In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.

Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.', 2, 9, 3, 9, 2);
insert into post ("createdAt", "updatedAt", title, contents, "creatorId", "votePoints", "likePoints", "laughPoints", "confusedPoints") values ('2021-12-06', '2020-12-17', '1', 'In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.

Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.', 2, 16, 0, 5, 0);
insert into post ("createdAt", "updatedAt", title, contents, "creatorId", "votePoints", "likePoints", "laughPoints", "confusedPoints") values ('2021-08-19', '2021-04-20', 'Gnome-Mobile, The', 'Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.

Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.', 1, 6, 1, 7, 0);
insert into post ("createdAt", "updatedAt", title, contents, "creatorId", "votePoints", "likePoints", "laughPoints", "confusedPoints") values ('2020-12-08', '2021-10-06', 'Decoding Annie Parker', 'In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.

Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.

Sed ante. Vivamus tortor. Duis mattis egestas metus.

Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.', 1, 8, 0, 6, 3);
insert into post ("createdAt", "updatedAt", title, contents, "creatorId", "votePoints", "likePoints", "laughPoints", "confusedPoints") values ('2020-11-07', '2021-06-19', 'Wake Island', 'Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.

Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.', 5, 7, 1, 9, 0);
insert into post ("createdAt", "updatedAt", title, contents, "creatorId", "votePoints", "likePoints", "laughPoints", "confusedPoints") values ('2020-11-22', '2021-04-04', 'Foster Brothers, The (Süt kardesler)', 'Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.

Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.', 2, 3, 0, 3, 0);
insert into post ("createdAt", "updatedAt", title, contents, "creatorId", "votePoints", "likePoints", "laughPoints", "confusedPoints") values ('2021-05-01', '2021-01-22', 'Live Nude Girls Unite!', 'Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.

Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.

Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.', 5, 0, 0, 0, 0);
insert into post ("createdAt", "updatedAt", title, contents, "creatorId", "votePoints", "likePoints", "laughPoints", "confusedPoints") values ('2021-11-27', '2022-02-12', 'Moonwalker', 'Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.

Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.', 5, 15, 5, 2, 5);
insert into post ("createdAt", "updatedAt", title, contents, "creatorId", "votePoints", "likePoints", "laughPoints", "confusedPoints") values ('2020-12-31', '2021-10-04', 'Doomsday Prophecy', 'Fusce consequat. Nulla nisl. Nunc nisl.

Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.', 5, 16, 0, 3, 0);
insert into post ("createdAt", "updatedAt", title, contents, "creatorId", "votePoints", "likePoints", "laughPoints", "confusedPoints") values ('2021-03-25', '2020-11-27', 'Love Don''t Cost a Thing', 'Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.

Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.

Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.', 3, 6, 5, 7, 0);
insert into post ("createdAt", "updatedAt", title, contents, "creatorId", "votePoints", "likePoints", "laughPoints", "confusedPoints") values ('2021-11-13', '2021-11-01', 'Cars That Ate Paris, The', 'Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.

Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.', 4, 14, 1, 0, 1);
insert into post ("createdAt", "updatedAt", title, contents, "creatorId", "votePoints", "likePoints", "laughPoints", "confusedPoints") values ('2021-01-17', '2021-07-30', 'Strange Invaders', 'Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.

Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.

Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.', 4, 12, 0, 10, 0);
insert into post ("createdAt", "updatedAt", title, contents, "creatorId", "votePoints", "likePoints", "laughPoints", "confusedPoints") values ('2022-01-03', '2021-09-18', 'Wild Man Blues', 'In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.

Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.

Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.

Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.', 3, 0, 0, 0, 0);
insert into post ("createdAt", "updatedAt", title, contents, "creatorId", "votePoints", "likePoints", "laughPoints", "confusedPoints") values ('2021-01-11', '2021-05-13', 'For My Father (Sof Shavua B''Tel Aviv)', 'Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.

Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.

Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.

Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.', 2, 0, 3, 7, 4);
insert into post ("createdAt", "updatedAt", title, contents, "creatorId", "votePoints", "likePoints", "laughPoints", "confusedPoints") values ('2021-04-10', '2021-09-24', 'Mr. Denning Drives North', 'Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.

Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.

Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.

Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.', 2, 3, 1, 3, 4);
insert into post ("createdAt", "updatedAt", title, contents, "creatorId", "votePoints", "likePoints", "laughPoints", "confusedPoints") values ('2021-09-03', '2020-12-09', 'Brooklyn Castle', 'Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.

Sed ante. Vivamus tortor. Duis mattis egestas metus.

Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.

Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.', 3, 19, 4, 8, 2);
insert into post ("createdAt", "updatedAt", title, contents, "creatorId", "votePoints", "likePoints", "laughPoints", "confusedPoints") values ('2021-01-16', '2021-06-30', 'Two Women (Ciociara, La)', 'Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.

Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.', 2, 7, 0, 10, 0);
insert into post ("createdAt", "updatedAt", title, contents, "creatorId", "votePoints", "likePoints", "laughPoints", "confusedPoints") values ('2021-11-08', '2022-01-31', 'Midnight in the Garden of Good and Evil', 'Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.

Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.', 5, 14, 5, 0, 0);
insert into post ("createdAt", "updatedAt", title, contents, "creatorId", "votePoints", "likePoints", "laughPoints", "confusedPoints") values ('2021-02-11', '2021-08-26', 'Filming ''Othello''', 'In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.

Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.

Sed ante. Vivamus tortor. Duis mattis egestas metus.

Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.', 2, 17, 3, 10, 0);
insert into post ("createdAt", "updatedAt", title, contents, "creatorId", "votePoints", "likePoints", "laughPoints", "confusedPoints") values ('2021-05-08', '2021-03-18', 'Harry Potter and the Deathly Hallows: Part 1', 'Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.

Sed ante. Vivamus tortor. Duis mattis egestas metus.', 5, 18, 5, 6, 4);
insert into post ("createdAt", "updatedAt", title, contents, "creatorId", "votePoints", "likePoints", "laughPoints", "confusedPoints") values ('2021-07-03', '2021-12-13', 'Blood Alley', 'Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.

In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.

Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.', 3, 12, 1, 1, 0);
insert into post ("createdAt", "updatedAt", title, contents, "creatorId", "votePoints", "likePoints", "laughPoints", "confusedPoints") values ('2021-02-16', '2021-09-14', 'Sterile Cuckoo, The', 'Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.

Sed ante. Vivamus tortor. Duis mattis egestas metus.', 1, 7, 2, 10, 0);
insert into post ("createdAt", "updatedAt", title, contents, "creatorId", "votePoints", "likePoints", "laughPoints", "confusedPoints") values ('2021-08-12', '2022-02-15', 'Imagine I''m Beautiful', 'Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.

Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.

Curabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.', 2, 15, 1, 5, 0);
        



        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
